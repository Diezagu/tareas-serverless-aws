import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb"

const clientBase = new DynamoDBClient({})
const client = DynamoDBDocumentClient.from(clientBase)

export const TareasHandler: APIGatewayProxyHandlerV2 = async (event) => {
  const method = event.requestContext.http.method

  switch (method) {
    case "GET":
      if (event.pathParameters?.id) {
        const result = await client.send(new GetCommand({
          TableName: "Tareas",
          Key: { id: event.pathParameters.id }
        }))

        const tarea = result.Item
        return tarea === undefined ? {
          statusCode: 404,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "No se encontro la tarea" })
        } : {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tarea)
        }
      } else {
        const result = await client.send(new ScanCommand({
          TableName: "Tareas"
        }))

        const tareas = result.Items ?? []

        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tareas)
        }
      }

    case "POST":
      const body = JSON.parse(event.body ?? "{}")
      const id = crypto.randomUUID()

      if (!body.texto) return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Parametros faltantes" })
      }

      try {
        await client.send(new PutCommand({
          TableName: "Tareas",
          Item: { id: id, texto: body.texto, completada: false }
        }))

        return {
          statusCode: 201,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Se creo correctamente la tarea: ", id })
        }
      } catch (error) {
        return {
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Ocurrio un error al crear la tarea" })
        }
      }

    case "PUT":
      const datos = JSON.parse(event.body ?? "{}")
      if (!datos.texto || datos.completada == undefined) {
        return {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Parametros faltantes" })
        }
      }

      if (!event.pathParameters?.id) {
        return {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Parametros faltantes" })
        }
      }

      try {
        await client.send(new UpdateCommand({
          TableName: "Tareas",
          Key: { id: event.pathParameters.id },
          UpdateExpression: "SET texto = :texto, completada = :completada",
          ExpressionAttributeValues: {
            ":texto": datos.texto,
            ":completada": datos.completada
          }
        }))

        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Recurso actualizado correctamente" })
        }
      } catch (error) {
        console.error("Error al actualizar", error)
        return {
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Error al actualizar el recurso" })
        }
      }

    case "DELETE":
      if (!event.pathParameters?.id) {
        return {
          statusCode: 400,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Parametros faltantes" })
        }
      }

      try{
        const response = await client.send(new DeleteCommand({
          TableName: "Tareas",
          Key: { id: event.pathParameters.id },
          ReturnValues: "ALL_OLD"
        }))
  
        if (!response.Attributes){
          return {
            statusCode: 404,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "No se encontro el recurso a eliminar" })
          }
        }
  
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Se elimino el recurso correctamente" })
        }
      } catch(error) {
        console.error("Error al eliminar el recurso", error)

        return {
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "Error al eliminar el recurso" })
        }
      }

      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Error al eliminar recurso" })
      }

    default:
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: "Method not allowed" })
      }
  }
}

import { fastify } from "fastify";
//import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "../database-postgresql.js"

const server = fastify()


//const database = new DatabaseMemory()
const database = new DatabasePostgres()

server.post('/pedido', async (request, reply) => {
const { title, description, price} = request.body

    await database.create({
        title,
        description,
        price,
    })

    return reply.status(201).send()
})



server.get('/pedido', async (request) => {
    const search = request.query.search
    const pedido = await database.list(search)

    return pedido
})



server.put('/pedido/:id', async (request, reply) => {
    const produtoId = request.params.id
    const { title, description, price} = request.body

    await database.update(produtoId, 
    {
        title,
        description,
        price,
    })

    return reply.status(204).send()
})



server.delete('/pedido/:id', async (request, reply) => {
    const produtoId = request.params.id

    await database.delete(produtoId)

    return reply.status(204).send()

})




server.listen({
    port: 3333,
})
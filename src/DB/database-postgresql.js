import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class DatabasePostgres {

    async list(search) {
        let produto;
    
        try {
            if (search) {
                produto = await sql`SELECT * FROM produto WHERE description ILIKE '%' || ${search} || '%'`;
            } else {
                produto = await sql`SELECT * FROM produto`;
            }
    
            return produto;
        } catch (error) {
            console.error('Erro ao executar consulta SQL:', error);
            throw new Error('Erro ao buscar produtos');
        }
    }

    async create(produto) {
        const produtoId = randomUUID()
        const { title, description, price} = produto

        await sql `INSERT INTO produto (id, title, description, price) VALUES (${produtoId}, ${title}, ${description}, ${price})`
    
    }

    async update(id, produto){
        const { title, description, price} = produto
        
        await sql `UPDATE produto set title = ${title}, description = ${description}, price = ${price} WHERE id = ${id}`
    }

    async delete(id){
        await sql` delete from produto WHERE id = ${id}`

    }
}
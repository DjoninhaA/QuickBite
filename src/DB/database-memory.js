import { randomUUID } from "crypto"

export class DatabaseMemory {
    #produto = new Map()


    list(search){
        return Array.from(this.#produto.entries())
        .map((produtoArray)=>{
            const id = produtoArray[0]
            const data = produtoArray[1]

            return {
                id,
                ...data,
            }
        })
        .filter(produto =>{
            if(search){
                return produto.title.includes(search)
            }

            return true
        })
    }

    create(produto) {
        const produtoId = randomUUID()
        this.#produto.set(produtoId, produto)
    }

    update(id, produto){
        this.#produto.set(id, produto)
    }

    delete(id){
        this.#produto.delete(id)
    }
}
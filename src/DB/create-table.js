import { sql } from './db.js'

// sql `DROP TABLE IF EXISTS produto;`.then(()=> {
//     console.log('Tabela apagada!')
// })

sql `
    CREATE TABLE produto (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        price NUMERIC(10, 2)
    );
`.then(()=> {
    console.log('Tabela Criada Com Sucesso!')
})
// Importamos o tradutor que acabamos de instalar!
// Usamos o '/promise' no final para habilitar o uso do async/await que você gostou.
const mysql = require('mysql2/promise'); 

// Criando a nossa "central telefônica" (o Pool)
const pool = mysql.createPool({
    host: 'localhost',      // O endereço do banco (como está no seu PC, é localhost)
    user: 'root',           // O usuário padrão do MySQL
    password: 'Biasi.2008', // ATENÇÃO: Troque isso pela senha que você usa no Workbench!
    database: 'empresa'     // O nome do banco que criamos agorinha
});

// Um testezinho rápido para ver se a ligação funcionou quando o arquivo rodar
pool.getConnection()
    .then(() => console.log("Conectado ao MySQL com sucesso! 🐬"))
    .catch((erro) => console.log("Deu ruim na conexão:", erro));

// Exportamos o pool para que os Controllers possam usá-lo para pedir dados!
module.exports = pool;
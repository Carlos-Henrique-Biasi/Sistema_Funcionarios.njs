// Importamos o tradutor que acabamos de instalar!
// Usamos o '/promise' no final para habilitar o uso do async/await que você gostou.
const mysql = require('mysql2/promise'); 

require('dotenv').config(); // Puxa as variáveis do arquivo .env

// Criando a nossa "central telefônica" (o Pool)
const pool = mysql.createPool({
    host: process.env.DB_HOST,      // O endereço do banco
    user: process.env.DB_USER,           // O usuário padrão do MySQL
    password: process.env.DB_PASSWORD, // ATENÇÃO: Troque isso pela senha que você usa no Workbench!
    database: process.env.DB_NAME,     // O nome do banco que criamos agorinha
    port: process.env.DB_PORT || 3306,
    ssl: { rejectUnauthorized: false } // <-- Adicione esta linha!
});

// Um testezinho rápido para ver se a ligação funcionou quando o arquivo rodar
pool.getConnection()
    .then(() => console.log("Conectado ao MySQL com sucesso! 🐬"))
    .catch((erro) => console.log("Deu ruim na conexão:", erro));

// Exportamos o pool para que os Controllers possam usá-lo para pedir dados!
module.exports = pool;
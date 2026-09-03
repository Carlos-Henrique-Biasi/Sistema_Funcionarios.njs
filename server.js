const express = require("express") // é como um "import java.xxxxx.Xxxxxxxx;" em java
const app = express()
const path = require('path')


const cors = require("cors")
app.use(cors()) //Permita que outros sites e páginas façam requisições para minha API.
app.use(express.json())

// A MÁGICA ACONTECE AQUI:
// Dizemos ao Express para expor a pasta "front-end" publicamente
app.use(express.static(path.join(__dirname, 'front-end')));
app.get('/', (req, res) => { //garante abrir apresentação primeiro.
    res.sendFile(path.join(__dirname, 'front-end', 'apresentacao.html'));
});

const empresasRoutes = require("./routes/empresasRoutes")
const funcionariosRoutes = require("./routes/funcionariosRoutes")
const faturamentoRoutes = require("./routes/faturamentoRoutes") 


app.use(funcionariosRoutes)
app.use(empresasRoutes)
app.use(faturamentoRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
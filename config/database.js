const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.amvjabd.mongodb.net/nutrilife?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true }).then(
  () => {console.log('Banco de dados conectado!') },
  err => { console.log('Não foi possível conectar ao banco de dados'+ err)})

  
module.exports = mongoose;
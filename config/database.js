const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb+srv://vinicius:vinicius@cluster0.amvjabd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)})

  
module.exports = connectDB;
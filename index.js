const express = require('express')
require('dotenv').config()
const { MongoClient } = require('mongodb');

const app = express()
const port = 5000

const uri =  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vljpp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
   console.log("Connected to dataBase Yahoo");
  } finally {
   // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Car JOy  Server')
})

app.listen(port, () => {
  console.log('Runnging Car Server on port',port)
})

 


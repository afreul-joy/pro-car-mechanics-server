const express = require('express')
const { MongoClient } = require('mongodb');
const objectId = require('mongodb').ObjectId;

const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 5000

app.use(cors());
app.use(express.json());
  

const uri =  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vljpp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
  //  console.log("Connected to dataBase Yahoo")
    const database = client.db("carMechanics");
    const servicesCollection = database.collection("services");

    //get api 
    app.get('/services', async (req, res) => {
      const cursor = servicesCollection.find({})
      const services = await cursor.toArray();
      res.send(services);
    })
    // Get Single Service 
    app.get('/services/:id', async(req, res) => {
      const id = req.params.id;
      console.log('get id hitting',id);
      const query = { _id: objectId(id) };
      const service = await servicesCollection.findOne(query);
      res.json(service)

      })

    // post api 
    app.post('/services', async (req, res) => {
      const service = req.body;
      // console.log('hit the post api',service);
      // res.send('post hitted')

      const result = await servicesCollection.insertOne(service)
      console.log(result);
      res.json(result)
    })


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

 


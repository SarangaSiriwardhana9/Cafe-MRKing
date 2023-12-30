const express = require('express')
const app = express();
const cors = require('cors');

const port = process.env.PORT || 6001

require('dotenv').config()
console.log(process.env.DB_USER)

//middleware
app.use(cors());
app.use(express.json());


//mongodb config

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cyocall.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
    // database and collection constiables
    const menuCollections = client.db("MR-King").collection("menus")
    const cartCollections = client.db("MR-King").collection("cartItems")

    //all menue items opertions
    app.get('/menu', async (req, res) => {
      const result = await menuCollections.find().toArray()
      res.send(result)
      
    })

    //all cart items opertions
    app.post('/carts', async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem)
      res.json(result)
    })

    //get cart items using email
    app.get('/carts', async (req, res) => {
        const email = req.query.email;
        const filter = {email: email}
        const result = await cartCollections.find(filter).toArray()
        res.send(result)
    }
    )
    //get spesific carts
    app.get('/carts/:id', async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await cartCollections.findOne(filter)
      res.send(result)
    }
    )

    //delete cart items using id
    app.delete('/carts/:id', async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)}
      const result = await cartCollections.deleteOne(filter)
      res.send(result)
    })

    //update cart  items quantity using id
    app.put('/carts/:id', async (req, res) => {
      const id = req.params.id;
      const {quantity} = req.body;
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          quantity: parseInt(quantity,10)
        },
      };
      const result = await cartCollections.updateOne(filter, updateDoc, options)
      res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello sara!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
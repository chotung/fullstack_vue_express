const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

//Define post routes

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostCollection()
  res.send(await posts.find({}).toArray()) // could put a query in the object
})

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostCollection()
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })    
    res.status(201).send()
})

//Delete post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id )})
    res.status(200).send()
})


// Connection to Mlab
async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect("mongodb://abc123:hello1@ds037824.mlab.com:37824/vue_express", { 
        useNewUrlParser: true
    });
    return client.db('vue_express').collection('posts')
}
// database name and collection specified


module.exports = router
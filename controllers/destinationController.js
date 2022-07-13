const express = require('express');
const router = express.Router();
const connection = require('../db/connection')
const ObjectId = require('mongodb').ObjectId

router.get('/', async (req, res) => {
    const db = await connection.getDb();
    // db.collection('destinations').find().toArray()
    const destinations = await db.collection('destinations').find({}).toArray();
    res.status(200).json({ status: 200, data: destinations });
})

router.get('/:id', async (req, res) => {
    // rendering some type of page
    // GETTTING all the results
    const db = await connection.getDb();
    // db.collection('destinations').find().toArray()
    const destination = await db.collection('destinations').find({ _id : ObjectId(req.params.id) }).toArray();
    res.status(200).json({ status: 200, data: destination });
})

router.post('/new', async (req, res) => {
    const db = await connection.getDb();
    const destinationsCollection = await db.collection('destinations')
    const newDestination = await destinationsCollection.insertOne(req.body);
	res.status(201).json({ status: 201, newDestination: newDestination });
    // destinationsCollection.insertOne(req.body)
    //     .then(result => {
    //         res.redirect('/')
    //     })
    //     .catch(error => console.error(error))
})

router.put('/edit/:id', (req, res) => {
    const db = connection.getDb();
    const destinationsCollection = db.collection('destinations')
    destinationsCollection.findOneAndUpdate(
        { _id : ObjectId(req.params.id) },
        {
            $set : {
                name: req.body.name,
                quote: req.body.location,
                imageSrc: req.body.url,
                description: req.body.description
            }
        }
    )
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
})

router.delete('/remove/:id', async (req, res) => {
    const db = await connection.getDb();
    const destinationsCollection = await db.collection('destinations')
    try {
        const deletedDestination = await destinationsCollection.deleteOne({ _id : ObjectId(req.params.id) })
        res.status(204).json('Destination deleted');
    } catch (e) {
        console.error(e)
    }
})


module.exports = router
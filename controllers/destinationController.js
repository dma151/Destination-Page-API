const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination')

router.get('/', async (req, res) => {
    const destinations = await Destination.find({})
    res.status(200).json({status:200, data: destinations})
})

router.get('/:id', async (req, res) => {
    const destination = await Destination.find({_id : req.params.id})
    res.status(200).json({status:200, data: destination})
})

router.post('/new', async (req, res) => {
    const createDestination = await Destination.create(req.body)
    res.status(201).json({ status: 201, newDestination: createDestination });
})

router.put('/edit/:id', (req, res) => {
    const updateDestination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json({status:200, data: updateDestination})
})

router.delete('/remove/:id', async (req, res) => {
    const deleteDestination = await Destination.findByIdAndDelete(req.params.id)
    res.status(204).json('Destination deleted')
})


module.exports = router
const express = require('express');

const router = express.Router();

const path = process.cwd();
const defaultSchema = require(`${path}/schemas/defaultSchema.js`);

router.post('/', async (req, res)=> {
    const schemaObject = new defaultSchema(req.body)
    console.log(req.body)
    await schemaObject.save()
    res.status(200).send('insertion completed')
})

router.get('/', async (req, res)=> {
    res.status(200).json(await defaultSchema.find({}, {_id: false, __v: false}))
})

router.delete('/', async (req, res)=> {
    await defaultSchema.deleteMany({})
    res.status(200).send('Items are deleted')
})

module.exports = router;
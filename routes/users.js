const express = require('express');

const router = express.Router();

const path = process.cwd();
const userSchema = require(`${path}/schemas/userSchema`);

router.post('/', async (req, res, next)=> {
    try {
        await new userSchema(req.body).save()
        res.status(200).send("User created")
    }
    catch(err) {
        next(err)
    }
})

router.delete('/:username', async (req, res, next)=> {
    try {
        await userSchema.deleteOne({username: req.params.username})
        res.status(200).send("User has been deleted")
    }
    catch(err) {
        next(err)
    }
})

router.get('/', async (req, res)=> {
    const all = await userSchema.find({}, {_id: false, __v: false})
    res.status(200).send(all)
})

module.exports = router;
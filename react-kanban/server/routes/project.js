const express=require('express')
const router=express.Router()
const models = require('../models/index')

router.get('/', function (req, res) {
    models.Project.findAll().then((response)=>console.log(response))


    res.send('Hello World');
})

router.get('/:id', function (req, res) {
    const id = req.params
    console.log("id",id)

    models.Project.findOne({ where: { id } }).then((response)=>console.log(response))


    res.send('Hello World');
})

router.put('/:id', async function (req, res) {
    
    const id = req.params
    console.log(req.body)
    console.log({ ...req.body })
    const result = await models.Project.update({ id, ...req.body })
    console.log(result)
    res.send(result);

})

router.post('/', async function (req, res) {
    
    console.log(req.body)
    console.log({ ...req.body })
    const result = await models.Project.create({ ...req.body })
    console.log(result)
    res.send(result);

})

module.exports = router
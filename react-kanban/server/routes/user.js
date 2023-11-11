const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(bodyParser.raw());
const models = require('../models/index')

router.get('/:id', function (req, res) {
    const id = req.params
    console.log("id",id)
    models.User.findOne({ where: { id } }).then((response)=>res.send(response))
})

router.get('/', function (req, res) {
    models.User.findAll({
        attributes: ['id', 'name']
    })
    .then((response)=>res.send(response))
})

router.put('/:id', async function (req, res) {
    
    const id = req.params
    console.log(req.body)
    console.log({ ...req.body })
    const result = await models.User.update({ id, ...req.body })
    console.log(result)
    res.send(result);
})

router.post('/', async function (req, res) {
    
    console.log(req.body)
    const result = await models.User.create({ ...req.body })
    console.log(result)
    res.send(result);
})



module.exports = router
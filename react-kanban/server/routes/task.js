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

    models.Task.findOne({ where: { id } }).then((response)=>console.log(response))


    res.send('Hello World');
})

router.get('/', function (req, res) {
    models.Task.findAll().then((response)=>console.log(response))


    res.send('Hello World');
})

router.put('/:id', async function (req, res) {
    
    const id = req.params
    console.log(req.body)
    console.log({ ...req.body })
    const result = await models.Task.update({ id, ...req.body })
    console.log(result)
    res.send(result);
})

router.post('/', async function (req, res) {
    
    console.log("1111", req.body)
    console.log("2222", { ...req.body })
    try {
        const result = await models.Task.create({ ...req.body })
        console.log("result", result)
        res.send({  
            success: 1,
            message: "Task created"
        });
    }
    catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }
})

router.post('/changeStatus', async function (req, res) {
    
    console.log(req.body.from, req.body.to)
    const result = await models.Task.update({ status: req.body.to }, {
        where: {
          id: req.body.from,
        },
      }
    )
    console.log(result)
    res.send(result);
})


module.exports = router
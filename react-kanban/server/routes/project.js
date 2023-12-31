const express=require('express')
const router=express.Router()
const models = require('../models/index')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
    models.Project.findAll(
        {
            include: [
                {
                    model: models.User,
                    required: true,
                    as: 'user'
                }
                // { 
                //     model: models.Task,
                //     required: false,
                //     as: 'task',
                //     include: [
                //         { 
                //             model: models.Status,
                //             required: false,
                //             as: 'task_status'
                //         }
                //     ],
                // }
            ],
        }
    ).then((response)=>res.send(response))
})

router.get('/:id', function (req, res) {
    const { id } = req.params
    console.log("id",id)
    models.Project.findOne({ where: { id }, include: [{ model: models.Task, required: false, as: 'task' }] })
    .then((response)=>{
        console.log("response", response)
        res.send(response)
    })
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
    
    console.log("xxxx1", req.body)
    console.log("xxxx2",{ ...req.body })
    try {
        const result = await models.Project.create({ ...req.body })
        console.log("result", result)
        res.send({  
            success: 1,
            message: "row inserted"
        });
    }
    catch(err) {
        res.send({  
            success: 0,
            message: err.toString()
        });
    }



})

module.exports = router
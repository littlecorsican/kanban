const express=require('express')
const router=express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
// router.use(bodyParser.raw());
const models = require('../models/index')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

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

// router.post('/', async function (req, res) {
    
//     console.log(req.body)
//     const result = await models.User.create({ ...req.body })
//     console.log(result)
//     res.send(result);
// })

router.post('/login', async function (req, res) {
    console.log(process.env.JWTSECRET) 
    console.log(req.body)
    const email = req.body.email
    
    models.User.findOne({ where: { email } }).then((user)=>{
        console.log("user", user)
        if (!user) {
            res.status(401).send({
                success: 0,
                message: "User not found"
            })
        }
        console.log("password", user.password) // password from database
        console.log("email", user.email) // password from database
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            console.log("result", result)
            if(!result){
                res.status(401).send({
                    success: 0,
                    message: "Passwords do not match"
                })
            }

            let data = { 
                time: new Date(), 
                email: email, 
            }
            const token = jwt.sign(data, process.env.JWTSECRET);
            res.status(200).send({
                success: 1,
                message: "",
                access_token: token,
                email: user.email,
                rank: user.rank
            })
            
        });
    })
})

router.post('/register', async function (req, res) {
    
    console.log(req.body)
    const email = req.body.email
    // CHECK IF USER EXSISTS
    models.User.findOne({ where: { email } }).then((user)=>{
        console.log("user", user)
        if (user) {
            res.status(401).send({
                success: 0,
                message: "Email has already been registered"
            })
        } else {
            // GENERATE HASH FROM PASSWORD
            bcrypt.genSalt(parseInt(process.env.SALTROUNDS), function(err, salt) {
                console.log("salt", salt, err)
                bcrypt.hash(req.body.password, salt, async function(err, hash) {
                    console.log("hash", hash, err)
                    const result = await models.User.create({ ...req.body, password: hash, rank: 1 })
                    console.log("result", result)
                    if (result) {
                        res.status(200).send({
                            success: 1,
                            message: "Register success"
                        })
                    }
                    res.status(401).send({
                        success: 0,
                        message: "Registeration failed"
                    })
                });
            });
        }
    });

})

module.exports = router
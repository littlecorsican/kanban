const express=require('express')
const router=express.Router()
const models = require('../models/index')
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const dotenv = require('dotenv')

router.post('/login', async function (req, res) {

    const { email, password } = req.body

    const result = await models.User.findOne({ where: {
        email: email,
      } 
    })
    bcrypt.compare(password, result.password, function(err, result) {
        if (result) {
            res.send({
                "status": 1,
                "message": "Login success",
                "data": ""
            });
        } else {
            res.send({
                "status": 0,
                "message": "Login failed",
                "data": ""
            });
        }
    });
})

router.post('/register', async function (req, res) {

    const { name, email, password } = req.body
    
    const result = await models.User.findOne({ where: {
        email: email,
      }  
    })
    if (result) {
        return res.send({
            "status": 0,
            "message": "User with that email already exists",
            "data": ""
        });
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, async function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            // Store hash in your password DB.
            const result2 = await models.User.create({ email, password: hash, name: name, rank: 1 })
                return res.send({
                    "status": 1,
                    "message": "User created succesfully",
                    "data": ""
                });
            });
    });

})

router.get('/logout', function (req, res) {
    models.User.findAll().then((response)=>console.log(response))
    

    res.send('Hello World');
})

function generateJwt() {
    require("crypto").randomBytes(35).toString("hex")
    const token = jwt.sign(
        { id: user._id, username, role: user.role },
        process.env.jwtSecret,
        {
          expiresIn: maxAge, // 3hrs in sec
        }
    );
}

module.exports = router
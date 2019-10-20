const express = require("express");
const router = express.Router();
const User = require('../models/User');
const UserSession = require('../models/UserSession');
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')


router.get('/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    });
  });

  router.get('/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });

  router.get('/:userId', async (req, res)=>{
    try{
    const user = await User.findById(req.params.userId)
    res.json(user)
    } catch (err){
      res.json({message:err})
    }
    })

    router.get('/', (req, res)=>{
    User.find({}, (err, result)=>{
        if(err){
            res.send(err)
            console.log(err)
        }else{
            res.json(result)
            console.log(result)
        }
    })
 })

 module.exports = router;
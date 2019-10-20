const express = require("express");
const router = express.Router();
const User = require('../models/User');
const mongoose = require("mongoose")


 
router.patch('/:userId', async function (req, res) {
    try {
      const foundUser = await User.findOne({ _id: req.params.userId })
      
      req.body.password = await foundUser.generateHash(req.body.password)
      
      const updatedPost = await User.updateOne({_id: req.params.userId}, {$set: {password: req.body.password}})
      console.log('foundUser', updatedPost)
      res.json(updatedPost)
    } catch (err) {
      res.json ({ message: err })
    }   
  });

  module.exports = router;
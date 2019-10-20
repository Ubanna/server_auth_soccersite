const express = require("express");
const router = express.Router();
const User = require('../models/User');
const mongoose = require("mongoose")

router.get('/:userId', async (req, res)=>{
  try{
  const user = await User.findById(req.params.userId)
  res.json(user)
  } catch (err){
    res.json({message:err})
  }
  })


router.delete('/:userId', async function (req, res) {
    try {
      const removedPost = await User.remove({_id: req.params.userId})
      res.json(removedPost)
    } catch (err) {
      res.json ({ message: err })
    }
    
  });

  module.exports = router;
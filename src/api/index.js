const express = require('express');
const User = require('../models/user');
const Group = require('../models/group');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/users', (req, res) => {
  User.find().then(users => {
    res.json({status: "OK", result: users});
  }).catch(err => {
    res.status(401).json({status: "Failed", message: 'ERROR'});
  })
});

router.post('/users/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10).then(hash=>{
    req.body.password = hash
    var user = new User(req.body)
    user.save().then(result => {
      res.json({status: "OK"});
    }).catch(err => {
      console.log("saving error");
      console.log(err.message);
      res.status(401).json({status: "Failed", message: "Failed"});
    })
  }).catch(err=>{
    console.log("Hashing error");
    console.log(err.message);
    res.status(401).json({status: "Failed", message: "Failed"});
  })
})

router.post('/users/login/:username/:password', (req, res) => {
  console.log(req.params);
  User.findOne({username: req.params.username}).then(user=>{
    bcrypt.compare(req.params.password, user.password).then(result=>{
      if(result){
        res.json({status: "OK", result: user});
      }else{
        res.json({status: "Failed", message: "Wrong Password"});
      }
    }).catch(err=>{
      console.log("Compare error");
      res.status(401).json({status: "Failed", message: "Failed"});
    })
  }).catch(err=>{
    console.log("No user", err);
    res.status(401).json({status: "Failed", message: "Failed"});
  })
})

router.get('/groups', (req, res) => {
  Group.find().then(groups => {
    res.json({status: "OK", result: groups});
  }).catch(err => {
    res.status(401).json({status: "Failed", message: 'ERROR'});
  })
});

router.get('/groups/:id', (req, res) => {
  Group.findById(req.params.id).then(group => {
    res.json({status: "OK", result: group});
  }).catch(err => {
    res.status(401).json({status: "Failed", message: 'ERROR'});
  })
});

router.post('/groups', (req, res) => {
  var group = new Group(req.body)
  group.save().then(result => {
    res.json({status: "OK"});
  }).catch(err => {
    res.status(401).json({status: "Failed", message: err.message});
  })
})

router.post('/groups/:id/addmessage', (req, res) => {
  var message = req.body.message

  Group.findByIdAndUpdate(req.params.id, {
    "$push": {
      "messages": message
    },
    "new": true,
    "upsert": true
  }).then(result => {
    res.json({status: "OK"})
  }).catch(err => {
    res.status(401).json({status: "Failed", message: err.message})
  })
})

module.exports = router;

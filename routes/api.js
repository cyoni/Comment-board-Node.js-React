const express = require('express')
const router = express.Router()
const blogPost = require('../models/post')
const mongoose = require('mongoose')

router.post('/api/save', (req, res) => {
   console.log(req.body)

   const newBlogPost = new blogPost(req.body)

   newBlogPost.save((error) => {

      if (error) {
         res.status(500).json({ msg: 'could not send the msg.' })
      }
      else {
         console.log('data saved!')
         res.json({ msg: 'Data was sent successfully!' })
      }
   })
})

router.post('/api/removePost', (req, res) => {

   mongoose.model('blogPost').deleteOne({ _id: req.body.key }, (err, something) => {
      console.log(something)
   })
})


router.get('/api', (req, res) => {
   blogPost.find({})
      .then((data) => {
         console.log('data: ', data)
         res.json(data)
      })
      .catch((error) => {
         console.log('error: ', error)
      })
})


module.exports = router
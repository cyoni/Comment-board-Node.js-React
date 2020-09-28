const express = require('express')
const router = express.Router()
const blogPost = require('../models/post')
const mongoose = require('mongoose')

router.post('/api/save', (req, res) => {
   console.log(req.body)

   if (req.body.postIdToEdit == null) {
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
   }
   else {
      console.log("edit mode")
      mongoose.model('blogPost').updateOne({_id: req.body.postIdToEdit},
          {title: req.body.title, body: req.body.body}, (err, result) => {
            res.json({ msg: 'Data was sent successfully!' })
            console.log('update: ' + result)
          })

   }
})

router.post('/api/removePost', (req, res) => {

   mongoose.model('blogPost').deleteOne({ _id: req.body.key },
      (err, result) => {
         if (err) {
            console.log("error")
         }
         else {
            res.json({ msg: 'Data was sent successfully!' })
            console.log(result)
         }
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
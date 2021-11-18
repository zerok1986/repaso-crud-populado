const express = require('express')
const router = express.Router()
const Park = require('./../models/Park.model')

// Endpoints
router.get('/new', (req, res, next) => {
  res.render('pages/parks/new-park')
})

router.post('/new', (req, res, next) => {
  Park.create(req.body)
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})
module.exports = router

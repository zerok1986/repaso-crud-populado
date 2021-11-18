const express = require('express')
const router = express.Router()
const Park = require('./../models/Park.model')
const Coaster = require('./../models/Coaster.model')

// Endpoints
router.get('/new', (req, res, next) => {
  Coaster.find()
    .populate('park_id')
    .then((allParks) => res.render('pages/coasters/new-coaster', { allParks }))
    .catch((err) => console.error(err))
})

router.post('/new', (req, res, next) => {
  Coaster.create(req.body)
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

router.get('/', (req, res, next) => {
  Coaster.find()
    .populate('park_id')
    .then((allCoasters) =>
      res.render('pages/coasters/coasters-index', { allCoasters })
    )
    .catch((err) => console.error(err))
})

router.post('/delete', (req, res, next) => {
  Coaster.findByIdAndRemove(req.query.id)
    .then(() => res.redirect('/coasters'))
    .catch((err) => console.error(err))
})

router.get('/edit', (req, res, next) => {
  const { id } = req.query
  const allParks = Park.find()
  const coaster = Coaster.findById(id).populate('park_id')

  Promise.all([allParks, coaster])
    .then((data) => {
      const [allParks, coaster] = data
      res.render('pages/coasters/edit-coaster', { allParks, coaster })
    })
    .catch((err) => console.error(err))
})

router.post('/edit', (req, res, next) => {
  const { id } = req.query
  Coaster.findByIdAndUpdate(id, req.body, { new: true })
    .then(() => res.redirect('/coasters'))
    .catch((err) => console.error(err))
})

router.get('/:id', (req, res, next) => {
  Coaster.findById(req.params.id)
    .populate('park_id')
    .then((coaster) => res.render('pages/coasters/coaster-details', coaster))
    .catch((err) => console.error(err))
})
module.exports = router

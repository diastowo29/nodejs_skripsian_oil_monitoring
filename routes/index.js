var express = require('express');
var router = express.Router();
const { oilTable, pumpTable } = require('../sequelize')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/:oil', function(req, res, next) {
  var oilCollection = {
    oil: req.params.oil
  }
  oilTable.destroy({
    truncate: true
  }).then(deleted => {
      oilTable.create(oilCollection).then(created => {
        pumpTable.findOne().then(pumpState => {
          if (pumpState == null) {
            pumpTable.create({
              pump: false
            }).then(createdPump => {
              res.status(200).send(createdPump)
            })
          } else {
            res.status(200).send(pumpState)
          }
        })
      })
  });
})

router.get('/dashboard', function(req, res, next) {
  oilTable.findAll().then(oilState => {
    pumpTable.findAll().then(pumpState => {
      res.render('dashboard', {
        title: 'Monitoring Tangki Minyak',
        oil: oilState[0].dataValues.oil,
        pump: pumpState[0].dataValues.pump
      })
    })
  });
})

router.get('/update-pump/:pump', function (req, res, next) {
  pumpTable.destroy({
    truncate: true
  }).then(deleted => {
    pumpTable.create({
      pump: req.params.pump
    }).then(createdPump => {
      res.status(200).send(createdPump)
    })
  })
})

module.exports = router;

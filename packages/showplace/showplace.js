const router = require('express').Router();
const dbShowplace = require('../db/db');
const { validate } = require('jsonschema');

const newShowplace = text => ({
  id: String(Math.random()
    .toString(16)
    .split('.')[1]),
  name: text.name,
  location: text.location,
  duration: text.duration,
  adventureId: text.adventureId
}); 

// router.use('/:id', (req, res, next) => {
//   const task = db.get('tasks')
//     .find({ id: req.params.id })
//     .value();
//
//   if (!task) {
//     next(new Error('CAN_NOT_FIND_TASK'));
//   }
// });

// GET /showplaces
router.get('/', (req, res) => {
  const showplace = dbShowplace.get('showplaces').value();

  res.json({ status: 'OK', data: showplace });
});

// GET /showplaces/:id
router.get('/:id', (req, res) => {
  const showplace = dbShowplace
    .get('showplaces')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: showplace });
});

// GET /showplaces/:adventureId
router.get('/:id', (req, res) => {
  const showplace = dbShowplace
    .get('showplaces')
    .find({ adventureId: req.params.adventureId })
    .value();

  res.json({ status: 'OK', data: showplace });
});


// POST /showplaces
router.post('/', (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: { text: { type: 'string' } },
  //   required: ['text'],
  //   additionalProperties: false,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

 const showplace = newShowplace(req.body);

 console.log(showplace);

 dbShowplace
    .get('showplaces')
    .unshift(showplace)
    .write();

  res.json({ status: 'OK', data: showplace });
});

// PATCH /showplaces/:id
router.patch('/:id', (req, res, next) => {
  // const requestBodySchema = {
  //   id: 'path-task',
  //   type: 'object',
  //   properties: {
  //     text: { type: 'string' },
  //     isCompleted: { type: 'boolean' },
  //   },
  //   additionalProperties: false,
  //   minProperties: 1,
  // };
  //
  // if (!validate(req.body, requestBodySchema).valid) {
  //   next(new Error('INVALID_API_FORMAT'));
  // }

  const showplace = dbShowplace
    .get('showplaces')
    .find({ id: req.params.id })
    .assign(req.body)
    .value();

  dbShowplace.write();

  res.json({ status: 'OK', data: showplace });
});

// DELETE /showplaces/:id
router.delete('/:id', (req, res) => {
  dbShowplace
    .get('showplaces')
    .remove({ id: req.params.id })
    .write();

  res.json({ status: 'OK' });
});

module.exports = router;

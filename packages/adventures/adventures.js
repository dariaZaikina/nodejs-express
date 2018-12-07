const router = require('express').Router();
const db = require('../db/db');
const { validate } = require('jsonschema');

const newTask = text => ({
  id: String(Math.random()
    .toString(16)
    .split('.')[1]),
  name: text.name,
  dateFrom: text.dateFrom,
  dateTo: text.dateTo
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

// GET /adventures
router.get('/', (req, res) => {
  const adventures = db.get('adventures').value();

  res.json({ status: 'OK', data: adventures });
});

// GET /adventures/:id
router.get('/:id', (req, res) => {
  const adventure = db
    .get('adventures')
    .find({ id: req.params.id })
    .value();

  res.json({ status: 'OK', data: adventure });
});

// POST /adventures
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

 const adventure = newTask(req.body);

console.log(adventure);

  db
    .get('adventures')
    .push(adventure)
    .write();

  res.json({ status: 'OK', data: adventure });
});

// PATCH /adventure/:id
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

  const adventure = db
    .get('adventures')
    .find({ id: req.params.id })
    .assign(req.body)
    .value();

  db.write();

  res.json({ status: 'OK', data: adventure });
});

// DELETE /adventures/:id
router.delete('/:id', (req, res) => {
  db
    .get('adventures')
    .remove({ id: req.params.id })
    .write();

  res.json({ status: 'OK' });
});

module.exports = router;

const { Router } = require('express');
const { jwtValidate } = require('../middlewares/jwtValidate');
const { check } = require('express-validator');
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventsController');
const { fieldsValidate } = require('../middlewares/fieldsValidate');

const router = Router();
router.use(jwtValidate);

// CREATE
router.post(
  '/',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').isISO8601().toDate(),
    check('end', 'Fecha de finalización es obligatoria').isISO8601().toDate(),
    fieldsValidate,
  ],
  createEvent
);

// READ
router.get('/', getEvents);

// UPDATE
router.put(
  '/:id',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').isISO8601().toDate(),
    check('end', 'Fecha de finalización es obligatoria').isISO8601().toDate(),
    fieldsValidate,
  ],
  updateEvent
);

// DELETE
router.delete('/:id', deleteEvent);

module.exports = router;

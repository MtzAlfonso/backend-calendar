const { response } = require('express');
const Event = require('../models/Event');

// CREATE
const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventSaved = await event.save();

    return res.status(201).json({
      ok: true,
      event: eventSaved,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

// READ
const getEvents = async (req, res = response) => {
  const events = await Event.find().populate('user', 'name');

  res.status(200).json({
    ok: true,
    events,
  });
};

// UPDATE
const updateEvent = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'updateEvent',
  });
};

// DELETE
const deleteEvent = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'deleteEvent',
  });
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };

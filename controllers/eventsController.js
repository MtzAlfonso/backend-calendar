const { response, request } = require('express');
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
const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    const { uid } = req;

    if (!event) {
      res.status(404).json({
        ok: false,
        msg: 'Event not found',
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegios para editar este evento',
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      evento: updateEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

// DELETE
const deleteEvent = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: 'deleteEvent',
  });
};

module.exports = { createEvent, getEvents, updateEvent, deleteEvent };

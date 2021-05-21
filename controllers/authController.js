const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const temp_user = await User.findOne({ email });

    if (temp_user) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario registrado con ese correo',
      });
    }

    const user = new User(req.body);

    // Encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Consulte al administrador',
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Confirmar passwords
    const validPassword = bcrypt.compareSync(password, user?.password || '');

    if (!user || !validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario y/o contraseña invalido(s)',
      });
    }

    // TODO: Generar token

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Consulte al administrador',
    });
  }
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew',
  });
};

module.exports = { createUser, loginUser, renewToken };

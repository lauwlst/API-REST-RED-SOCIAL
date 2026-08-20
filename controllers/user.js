//Importar dependencias y módulos
const bcrypt = require("bcrypt");

//Importar modelos
const User = require("../models/user");

//Acciones de prueba
const pruebaUser = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde: controllers/user.js",
  });
};

//Registro de usuarios
const register = async (req, res) => {
  // Recoger datos de la petición
  let params = req.body;

  // Comprobar que me llegan bien(+ validacion)
  if (!params.name || !params.email || !params.password || !params.nick) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  // Control usuarios duplicados
  try {
    const users = await User.find({
      $or: [
        { email: params.email.toLowerCase() },
        { nick: params.nick.toLowerCase() },
      ],
    });

    if (users && users.length >= 1) {
      return res.status(200).send({
        status: "success",
        message: "El usuario ya existe",
      });
    }

    // Cifrar la contraseña
    params.password = await bcrypt.hash(params.password, 10);

    // Crear objeto de usuario y guardarlo en la bbdd
    const userStored = await new User(params).save();

    // Devolver resultado
    return res.status(200).json({
      status: "success",
      message: "Usuario registrado correctamente",
      user: userStored,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error al guardar el usuario",
    });
  }
};

const login = async (req, res) => {
  //Recoger parámetros body
  let params = req.body;

  if (!params.email || !params.password) {
    return res.status(400).send({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  //Buscar en la BBDD si existe
  try {
    const user = await User.findOne({ email: params.email }).select({
      password: 0,
    });

    if (!user)
      return res
        .status(404)
        .send({ status: "error", message: "No existe el usuario" });

    //Comprobar su contraseña

    //Devolver Token

    //Devolver datos del usuario

    return res.status(200).send({
      status: "success",
      message: "Acción de login",
      user,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", message: "Error en la consulta de usuarios" });
  }
};

//Exportar acciones
module.exports = {
  pruebaUser,
  register,
  login,
};

const express = require('express');
const mysql = require('mysql');
const md5 = require('md5'); // Importar el módulo md5
const crypto = require('crypto');


const app = express();
const port = 3000;

app.use(express.json());

const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Moreno0310SM21',
  database: 'jacketon',
  port: 3306,
});

//prueba de conexion a la bdd
app.get('/connect-db', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      res.status(500).send('No hay conexión a la base de datos');
      return;
    }

    // Consultar el primer registro de la tabla usuario
    connection.query('SELECT * FROM usuario LIMIT 1', (err, result) => {
      connection.release(); // Liberar la conexión después de usarla

      if (err) {
        console.error('Error al consultar el primer registro:', err);
        res.status(500).send('Error al consultar el primer registro');
        return;
      }

      if (result.length > 0) {
        const firstUser = result[0];
        res.send(`Primer usuario: ${JSON.stringify(firstUser)}`);
      } else {
        res.send('No hay usuarios en la tabla');
      }
    });
  });
});


// Endpoint para verificar las credenciales de inicio de sesión
app.post('/login', (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({ message: 'Por favor ingresa correo electrónico y contraseña' });
  }

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return res.status(500).json({ message: 'No hay conexión a la base de datos' });
    }

    // Calcular el hash MD5 de la contraseña proporcionada por el usuario
    const hashedPassword = md5(user_password);

    // Consultar si existe un usuario con las credenciales proporcionadas
    connection.query('SELECT * FROM usuarios WHERE email_usu = ? AND pass_usu = ?', [user_email, hashedPassword], (err, result) => {
      connection.release(); // Liberar la conexión después de usarla

      if (err) {
        console.error('Error al verificar las credenciales:', err);
        return res.status(500).json({ message: 'Error al verificar las credenciales' });
      }

      if (result.length > 0) {
        // Usuario encontrado, enviar respuesta de inicio de sesión exitoso con datos del usuario
        const user = result[0]; // Tomar el primer usuario encontrado (suponiendo que el correo es único)
        res.json({
          message: 'Inicio de sesión exitoso',
          user: {
            user_id: user.id_usu,
            user_name: user.nom_usu,
            user_email: user.email_usu,
            user_last_name: user.app_usu,
            // Agregar más campos del usuario si es necesario
          }
        });
      } else {
        // Usuario no encontrado, enviar mensaje de error
        res.status(401).json({ message: 'Credenciales incorrectas' });
      }
    });
  });
});


// Endpoint para obtener los datos del usuario
app.get('/user-data', (req, res) => {
  const userId = req.query.userId; // Supongamos que pasamos el ID del usuario como un query param

  if (!userId) {
    return res.status(400).json({ message: 'ID de usuario requerido' });
  }

  db.getConnection((err, connection) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return res.status(500).json({ message: 'No hay conexión a la base de datos' });
    }

    connection.query('SELECT * FROM usuarios WHERE id_usu = ?', [userId], (err, result) => {
      connection.release(); // Liberar la conexión después de usarla

      if (err) {
        console.error('Error al obtener los datos del usuario:', err);
        return res.status(500).json({ message: 'Error al obtener los datos del usuario' });
      }

      if (result.length > 0) {
        const user = result[0];
        res.json({
          message: 'Datos del usuario obtenidos exitosamente',
          user: {
            user_id: user.id_usu,
            user_name: user.nom_usu,
            user_email: user.email_usu,
            user_last_name: user.app_usu
          }
        });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    });
  });
});


// Endpoint para verificar las credenciales de registro
app.post('/signup', (req, res) => {
  const nombre = req.body.user_name;
  const apellidos = req.body.user_last_name;
  const email = req.body.user_email;
  const contrasena = req.body.user_password;
  const tipo = 'empleado';

  // Verificación de valores obligatorios
  if (!nombre || !apellidos || !email || !contrasena || !tipo) {
      console.error('Faltan valores obligatorios');
      return res.status(400).send('Faltan valores obligatorios');
  }

  // Validación de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      console.error('Correo electrónico inválido');
      return res.status(400).send('Correo electrónico inválido');
  }

  const hashedPassword = crypto.createHash('md5').update(contrasena).digest('hex');

  // Verificar si el email ya existe en la base de datos
  db.query("SELECT email_usu FROM usuarios WHERE email_usu = ?", [email], (err, result) => {
      if (err) {
          console.error("Error al verificar el email en la base de datos", err);
          return res.status(500).send("Error interno del servidor");
      }

      if (result.length > 0) {
          console.error('El email ya está registrado');
          return res.status(403).send('El email ya está registrado');
      }

      // Si el email no existe en la base de datos, proceder con la inserción
      db.query("INSERT INTO usuarios(nom_usu, app_usu, email_usu, pass_usu, tipo_usu) VALUES(?,?,?,?,?)",
          [nombre, apellidos, email, hashedPassword, tipo],
          (err, result) => {
              if (err) {
                  console.error("Error al ejecutar al INSERTAR", err);
                  return res.status(500).send("Error interno del servidor");
              }
              console.log("Registro Exitoso...!");
              res.send("Registro Exitoso...!");
          }
      );
  });
});


app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

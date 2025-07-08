const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Resend } = require('resend');

const app = express();
const port = 3000;

// Reemplaza con tu API Key de Resend
const resend = new Resend('re_epvrnuWB_H2rexcJukwJyZRgnNFpr5nrx'); // 👈 Pega aquí tu API Key real

app.use(cors());
app.use(bodyParser.json());

app.post('/enviar-formulario', async (req, res) => {
  const { nombre, correo, numero, mensaje } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'Contacto Web <onboarding@resend.dev>', // Puedes dejar este mientras no verifiques dominio
      to: 'proyectos@dsgperutech.com', // 👈 Cambia por el correo de la empresa
      subject: 'Nuevo mensaje del formulario de contacto',
      text: `
📩 Nuevo mensaje del formulario:

🔹 Nombre: ${nombre}
🔹 Correo: ${correo}
🔹 Número: ${numero}
📝 Mensaje:
${mensaje}
      `
    });

    console.log("Correo enviado con Resend:", response);
    res.status(200).json({ mensaje: '✅ Mensaje enviado con éxito' });
  } catch (error) {
    console.error("❌ Error al enviar con Resend:", error);
    res.status(500).json({ mensaje: '❌ Error al enviar el mensaje', error });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});

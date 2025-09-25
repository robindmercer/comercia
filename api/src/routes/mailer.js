const express = require("express");
const cors = require("cors");
const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

// console.log('=== DEBUG VARIABLES DE ENTORNO ===');
// console.log('NODE_ENV:', process.env);
// console.log('SMTP_HOST:', process.env.SMTP_HOST);
// console.log('SMTP_USER:', process.env.SMTP_USER);
// console.log('SMTP_PORT:', process.env.SMTP_PORT);
// console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
// console.log('SMTP_PASS exists:', !!process.env.SMTP_PASS);
// console.log('=====================================');

router.post("/", async (req, res) => {
   const { desde, recibe, email, asunto, texto } = req.body;
   const { SMTP_HOST, SMTP_USER, SMTP_PORT, SMTP_SECURE, SMTP_PASS } =
      process.env;
   console.log(" SMTP_HOST: ", SMTP_HOST);
   if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.error("Faltan variables SMTP requeridas");
      return res.status(500).json({
         message: "Configuración de email incompleta",
      });
   }

   // Configura tu transporte SMTP
   const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
         user: SMTP_USER,
         pass: SMTP_PASS,
      },
      logger: true,
      debug: true,
      tls: {
         rejectUnauthorized: false, // <--- Agrega esta línea
      },
   });

   const newmail = {
      from: desde,
      to: recibe, //"robindmercer@yahoo.com.ar",
      subject: asunto, //"prueba",
      html: texto,
      replyTo: email, // El correo del usuario
   };
   console.log("newmail: ", newmail);

   try {
      await transporter.sendMail(newmail);
      // await transporter.sendMail(mailOptions);
      // await transporter.sendMail(autoReply);
      res.status(200).json({
         message: "Email enviado y respuesta automática enviada",
      });
   } catch (error) {
      console.log("Error occured:", error);
      res.status(500).json({ message: "Error al enviar el email" });
   }
});

module.exports = router;

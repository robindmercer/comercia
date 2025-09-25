require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { Router } = require("express");
const router = Router();

const nodemailer = require("nodemailer");
const { SMTP_HOST, SMTP_USER, SMTP_PORT, SMTP_SECURE, SMTP_PASS } = process.env;
router.post("/", async (req, res) => {
   const { desde,recibe,email,asunto, texto } = req.body;
   console.log('process.env.SMTP_HOST: ', process.env.SMTP_HOST);
   console.log('process.env.SMTP_USER: ', process.env.SMTP_USER);

   // Configura tu transporte SMTP
   const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, 
      port: process.env.SMTP_PORT ,
      secure: process.env.SMTP_SECURE,
      auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
      },
      tls: {
         rejectUnauthorized: false, // <--- Agrega esta línea
      },
   });

   const newmail = {
      from: desde,
      to: recibe,//"robindmercer@yahoo.com.ar",
      subject: asunto,//"prueba",
      html: texto,
      replyTo: email, // El correo del usuario
   };
   console.log('newmail: ', newmail);

   try {
      await transporter.sendMail(newmail);
      // await transporter.sendMail(mailOptions);
      // await transporter.sendMail(autoReply);
      res.status(200).json({ message: "Email enviado y respuesta automática enviada" });
   } catch (error) {
      console.log("Error occured:", error);
      res.status(500).json({ message: "Error al enviar el email" });
   }
});

module.exports = router;

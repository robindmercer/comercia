const { Router } = require("express");
// const { Sequelize, Op } = require("sequelize");
// const { Tabla, Status } = require("../db");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const router = express();
router.use(express.json());
router.use(cors());
router.use(fileUpload());



router.post("/", (req, res) => {
    console.log('req: ', req.files);
    const filename = Date.now() + "_" + req.files.screenshot.name;
    const file = req.files.screenshot;
    let uploadPath = __dirname + "/uploads/" + filename;
    console.log('uploadPath: ', uploadPath);
    file.mv(uploadPath, (err) => {
      if (err) {
        return res.send(err);
      }
    });
    res.send({ message: {uploadPath} });
  });
  
  module.exports = router;  
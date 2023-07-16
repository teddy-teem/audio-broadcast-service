const express = require("express");

const router = express.Router();
router
  .get("/health", (req, res)=>{
    res.send({status: "ok", message: "I am healthy"});
  });
module.exports = router;

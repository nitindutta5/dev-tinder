const express = require('express');
const { userAuth } = require('../middleware');
const router = express.Router();


router.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user; // Assuming userAuth middleware sets req.user        
    res.send("Connection Request Sent to " + user.name);

});

module.exports = router;
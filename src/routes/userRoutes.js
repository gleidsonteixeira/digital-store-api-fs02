const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/login', async (req, res) => {
    return res.send(await controller.login(req.body));
});

router.get('/', async (req, res) => {
    return res.send(await controller.listALL());
});

router.post('/', async (req, res) => {
    return res.send(await controller.create(req.body));
});

module.exports = router;
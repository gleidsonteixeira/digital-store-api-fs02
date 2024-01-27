const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.post('/login', async (req, res) => {
    return res.send(await controller.login(req.body));
});

router.get('/', async (req, res) => {
    return res.status(200).send(await controller.listALL());
});

router.post('/', async (req, res) => {
    return res.status(201).send(await controller.create(req.body));
});

router.delete('/:id', async (req, res) => {
    return res.status(200).send(await controller.destroy(req.params.id));
});

module.exports = router;
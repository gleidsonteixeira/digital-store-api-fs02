const express = require('express');
const router = express.Router();
const controller = require('../controllers/brandController');

router.get('/', async (req, res) => {
    res.send(await controller.listarTodos());
});

router.get('/:id', async (req, res) => {
    res.send(await controller.listarUm(req.params.id));
});

router.post('/', async (req, res) => {
    res.send(await controller.criar(req.body));
});

router.put('/:id', async (req, res) => {
    res.send(await controller.editar(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    res.send(await controller.deletar(req.params.id));
});

module.exports = router;
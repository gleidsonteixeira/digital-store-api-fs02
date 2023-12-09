const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('lista de brands');
});

router.post('/', (req, res) => {
    res.send(`criar uma brand: ${JSON.stringify(req.body)}`);
});

router.put('/:id', (req, res) => {
    res.send(`editar a brand: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`deletar a brand: ${req.params.id}`);
});

module.exports = router;
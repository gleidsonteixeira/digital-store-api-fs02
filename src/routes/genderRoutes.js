const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('lista de gender');
});

router.post('/', (req, res) => {
    res.send(`criar uma gender: ${JSON.stringify(req.body)}`);
});

router.put('/:id', (req, res) => {
    res.send(`editar a gender: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`deletar a gender: ${req.params.id}`);
});

module.exports = router;
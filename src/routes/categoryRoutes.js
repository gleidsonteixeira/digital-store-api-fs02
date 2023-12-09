const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('lista de categorys');
});

router.post('/', (req, res) => {
    res.send(`criar uma category: ${JSON.stringify(req.body)}`);
});

router.put('/:id', (req, res) => {
    res.send(`editar a category: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`deletar a category: ${req.params.id}`);
});

module.exports = router;
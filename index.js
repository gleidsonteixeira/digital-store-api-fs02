const express = require('express');
const app = express();
const port = 8000;
const brandRoutes = require('./src/routes/brandRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const genderRoutes = require('./src/routes/genderRoutes');

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Seja bem-vindo à API da Digital Store.');
});

app.use('/brands', brandRoutes);
app.use('/categories', categoryRoutes);
app.use('/genders', genderRoutes);

app.all('*', (request, response) => {
    response.status(404).send('Not found');
});

app.listen(port, () => {
    console.log(`Servidor de pé no link: http://localhost:${port}`);
});
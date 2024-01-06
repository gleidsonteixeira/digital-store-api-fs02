const express = require('express');
const app = express();
const port = 8000;
const brandRoutes = require('./src/routes/brandRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const genderRoutes = require('./src/routes/genderRoutes');
const userRoutes = require('./src/routes/userRoutes');
const userController = require('./src/controllers/userController');
const jwt = require('jsonwebtoken');

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Seja bem-vindo à API da Digital Store.');
});

app.use('/users', userRoutes);
app.use(async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send('Token é necessário!');
    }
    const result = await userController.checkToken(req.headers.authorization.split(' ')[1]);
    if(result.length === 0){
        return res.status(401).send('Token expirado!');
    }
    jwt.verify(req.headers.authorization.split(' ')[1], 'digital-store-api', (error) => {
        if(error){
            return res.status(401).send('Token expirado!');
        }
        next();
    });
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
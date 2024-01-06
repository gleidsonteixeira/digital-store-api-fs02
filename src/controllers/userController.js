const DB = require('../database/index');
const jwt = require('jsonwebtoken');
const table = 'users';

async function login(data){
    try {
        if(!data.user_email || !data.user_password){
            throw new Error('Email e senha são obrigatórios');
        }
        const result = await DB.execute(`SELECT * FROM ${table} WHERE user_email = '${data.user_email}' AND user_password = '${data.user_password}';`);

        if(result.length === 0){
            return {
                type: 'warning',
                message: 'Email ou senha incorretos'
            }
        }

        const token = jwt.sign({ user_id: result[0].user_id }, 'digital-store-api', {
            expiresIn: '1h'
        });

        await DB.execute(`UPDATE ${table} SET token = '${token}' WHERE user_id = ${result[0].user_id};`)
        return {
            type: 'success',
            token
        }

    } catch (error) {
        return {
            type: 'error',
            message: error.message
        }
    }
}

async function checkToken(token){
    return await DB.execute(`SELECT * FROM ${table} WHERE token = '${token}';`);
}

module.exports = {
    login,
    checkToken
}
const DB = require('../database/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const table = 'users';

async function listALL(){
    return await DB.execute(`SELECT user_id, user_name, user_email, user_level FROM ${table};`);
}

async function create(data){
    try {
        if(!data.user_name || !data.user_email || !data.user_password){
            throw new Error('Dados imcompletos!');
        }

        const [emailExiste] = await DB.execute(`SELECT * FROM ${table} WHERE user_email = '${data.user_email}';`);

        if(emailExiste){
            return {
                type: 'warn',
                message: 'Este usuário já existe!'
            };
        }

        bcrypt.hash(data.user_password, 10, async (error, hash) => {
            if(error){
                throw new Error(error.message);
            }

            await DB.execute(`INSERT INTO ${table} (user_name, user_email, user_password, user_level) VALUES ('${data.user_name}', '${data.user_email}', '${hash}', ${data.user_level});`);
        });

        return {
            type: 'success',
            message: 'Usuário criado com sucesso!'
        }

    } catch (error) {
        return {
            type: 'error',
            message: error.message
        }
    }
}

async function destroy(id){
    try {
        await DB.execute(`DELETE FROM ${table} WHERE user_id = '${id}';`);
        return {
            type: 'success',
            message: 'Usuário deletado!'
        }
    } catch (error) {
        return {
            type: 'error',
            message: error.message
        }
    }
}

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
    checkToken,
    listALL,
    create,
    destroy 
}
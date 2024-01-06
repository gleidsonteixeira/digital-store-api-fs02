const DB = require('../database/index');
const tabela = 'brands';

async function listarTodos() {
    return await DB.execute(`SELECT * FROM ${tabela};`)
}

async function listarUm(id) {
    return await DB.execute(`SELECT * FROM ${tabela} WHERE brand_id = ${id};`)
}

async function criar(data) {
    try {
        if (!data.brand_name) {
            throw new Error('brand_name é um campo obrigatório!');
        }
        const linha = await DB.execute(`INSERT INTO ${tabela} (brand_name) VALUES ('${data.brand_name}');`);
        return {
            type: 'success',
            data: await listarUm(linha.insertId)
        };
    } catch (error) {
        return {
            type: 'error',
            message: error.message
        }
    }
}

async function editar(id, data){
    try {
        if (!data.brand_name) {
            throw new Error('brand_name é um campo obrigatório!');
        }
        if(data.brand_status){
            await DB.execute(`UPDATE ${tabela} SET brand_name = '${data.brand_name}', brand_status = ${data.brand_status} WHERE brand_id = ${id};`);
        }else{
            await DB.execute(`UPDATE ${tabela} SET brand_name = '${data.brand_name}' WHERE brand_id = ${id};`);
        }
        return {
            type: 'success',
            data: await listarUm(id)
        }
    } catch (error) {
        return {
            type: 'error',
            message: error.message
        }
    }
}

async function deletar(id) {
    try {
        const linha = await DB.execute(`DELETE FROM ${tabela} WHERE brand_id = ${id};`);
        return {
            type: "success",
            message: linha.affectedRows != 0 ? "Excluído com sucesso." : "Id não encontrado"
        }
    } catch (error) {
        return {
            type: "error",
            message: error.message
        }
    }
}

module.exports = {
    listarTodos,
    listarUm,
    criar,
    editar,
    deletar
}
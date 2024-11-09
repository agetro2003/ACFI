import {pool} from "../utils/index.js"

const create = async (table, data)=>{
    const query = `
        INSERT INTO ${table} (${Object.keys(data).join(",")}) 
        VALUES (${Object.values(data).map((value, idx)=>`$${idx+1}`).join(",")})
    `
    const values = Object.values(data)
    try {
        return await pool.query(query, values)
    } catch (error) {
        throw error
    }
}

const getAll = async (table)=>{
    const query = `
        SELECT * FROM ${table}
    `
    try {
        return await pool.query(query)
    } catch (error) {
        throw error
    }
}

const getByField = async (table, searchField, searchValue)=>{
    const query = `
        SELECT * FROM ${table}
        WHERE ${searchField}=$1
    `
    try {
        const res = await pool.query(query, [searchValue])
        return res.rows[0]
    } catch (error) {
        throw error
    }
}

const update = async (table, data, searchField, searchValue)=>{
    const query = `
        UPDATE ${table} 
        SET ${Object.keys(data).map((key, idx)=>`${key}=$${idx+1}`).join(",")}
        WHERE ${searchField}=$${Object.keys(data).length+1}
    `
    const values = [...Object.values(data), searchValue]
    try {
        return await pool.query(query, values)
    } catch (error) {
        throw error
    }
}

const remove = async (table, searchField, searchValue)=>{
    const query = `
        DELETE FROM ${table}
        WHERE ${searchField}=$1
    `
    try {
        return await pool.query(query, [searchValue])
    } catch (error) {
        throw error
    }
}

export default {
    create,
    getAll,
    update,
    remove,
    getByField
}
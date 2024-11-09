import {pool} from "../utils/index.js"

const getUsersCart = async (userId)=>{
    const query = `
        SELECT cart_product, cart_quantity, product_name, product_description, product_price, product_category FROM cart 
        INNER JOIN product ON cart.cart_product=product.product_id
        WHERE cart_user=$1
    `
    try {
        const res = await pool.query(query, [userId])
        const cart = res.rows
        return cart
    }   catch (error) {
        throw error
    }
}

const addToCart = async (userId, productId, quantity)=>{
    const query = `
        INSERT INTO cart (cart_user, cart_product, cart_quantity)
        VALUES ($1, $2, $3)
    `
    try {
        return await pool.query(query, [userId, productId, quantity])
    } catch (error) {
        throw error
    }
}

const updateCart = async (userId, productId, quantity)=>{
    const query = `
        UPDATE cart
        SET cart_quantity=$1
        WHERE cart_user=$2 AND cart_product=$3
    `
    try {
        return await pool.query(query, [quantity, userId, productId])
    } catch (error) {
        throw error
    }
}

const removeFromCart = async (userId, productId)=>{
    const query = `
        DELETE FROM cart
        WHERE cart_user=$1 AND cart_product=$2
    `
    try {
        return await pool.query(query, [userId, productId])
    } catch (error) {
        throw error
    }
}

const clearCart = async (userId)=>{
    const query = `
        DELETE FROM cart
        WHERE cart_user=$1
    `
    try {
        return await pool.query(query, [userId])
    } catch (error) {
        throw error
    }
}

export default {
    getUsersCart,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart
}
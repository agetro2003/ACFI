import { cartService } from '../services/index.js'
import { ApiResponse } from '../utils/index.js'

const getCart = async (req, res) => {
    try {
        const cart = await cartService.getUsersCart(req.user.user_email)
        return ApiResponse(res, { data: cart, message: 'Cart fetched', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const addToCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body
        await cartService.addToCart(req.user.user_email, product_id, quantity)
        return ApiResponse(res, { message: 'Product added to cart', code: 201 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const updateCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body
        await cartService.updateCart(req.user.user_email, product_id, quantity)
        return ApiResponse(res, { message: 'Cart updated', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { product_id } = req.body
        await cartService.removeFromCart(req.user.user_email, product_id)
        return ApiResponse(res, { message: 'Product removed from cart', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const clearCart = async (req, res) => {
    try {
        await cartService.clearCart(req.user.user_email)
        return ApiResponse(res, { message: 'Cart cleared', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

export default { getCart, addToCart, updateCart, removeFromCart, clearCart }
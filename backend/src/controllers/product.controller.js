import { crudService } from '../services/index.js'
import { ApiResponse } from '../utils/index.js'
const getProducts = async (req, res) => {
    try {
        const products = await crudService.getAll('product')
        return ApiResponse(res, { data: products.rows, message: 'Products fetched', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const createProduct = async (req, res) => {
    try {
        const {
            product_name,
            product_description,
            product_price,
            product_category
        } = req.body

        const product = product_category ? {
            product_name,
            product_description,
            product_price,
            product_category
        } : {
            product_name,
            product_description,
            product_price
        }
        await crudService.create('product', product)
        return ApiResponse(res, { message: 'Product created', code: 201 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const updateProduct = async (req, res) => {
    try {
        const {
            product_name,
            product_description,
            product_price,
            product_category
        } = req.body

        const product = product_category ? {
            product_name,
            product_description,
            product_price,
            product_category
        } : {
            product_name,
            product_description,
            product_price
        }

        await crudService.update('product', product, 'product_id', req.params.id)
        return ApiResponse(res, { message: 'Product updated', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const deleteProduct = async (req, res) => {
    try {
        await crudService.remove('product', 'product_id', req.params.id)
        return ApiResponse(res, { message: 'Product deleted', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

export default {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}
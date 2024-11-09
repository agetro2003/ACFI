import { crudService } from '../services/index.js'
import { ApiResponse } from '../utils/index.js'

const getCategories = async (req, res) => {
    try {
        const categories = await crudService.getAll('category')
        return ApiResponse(res, { data: categories.rows, message: 'Categories fetched', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const createCategory = async (req, res) => {
    try {
        const {
            category_name
        } = req.body

        const category = {
            category_name,
        }
        await crudService.create('category', category)
        return ApiResponse(res, { message: 'Category created', code: 201 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const updateCategory = async (req, res) => {
    try {
        const {
            category_name
        } = req.body

        const category = {
            category_name,
        }

        await crudService.update('category', category, 'category_name', req.params.id)
        return ApiResponse(res, { message: 'Category updated', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const deleteCategory = async (req, res) => {
    try {
        await crudService.remove('category', 'category_name', req.params.id)
        return ApiResponse(res, { message: 'Category deleted', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

export default {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}
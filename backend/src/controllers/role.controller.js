import { crudService } from '../services/index.js'
import { ApiResponse } from '../utils/index.js'

const getRoles = async (req, res) => {
    try {
        const roles = await crudService.getAll('role')
        return ApiResponse(res, { data: roles.rows, message: 'Roles fetched', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const createRole = async (req, res) => {
    try {
        const {
            role_name,
        } = req.body

        const role = {
            role_name,
        }
        await crudService.create('role', role)
        return ApiResponse(res, { message: 'Role created', code: 201 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const updateRole = async (req, res) => {
    try {
        const {
            role_name,
        } = req.body

        const role = {
            role_name,
        }

        await crudService.update('role', role, 'role_name', req.params.id)
        return ApiResponse(res, { message: 'role updated', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const deleteRole = async (req, res) => {
    try {
        await crudService.remove('role', 'role_name', req.params.id)
        return ApiResponse(res, { message: 'Role deleted', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

export default {
    getRoles,
    createRole,
    updateRole,
    deleteRole
}
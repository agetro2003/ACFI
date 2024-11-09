import { crudService } from '../services/index.js'
import { ApiResponse } from '../utils/index.js'

const getProfiles = async (req, res) => {
    try {
        const profiles = await crudService.getAll('profile')
        return ApiResponse(res, { data: profiles.rows, message: 'Profiles fetched', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const createProfile = async (req, res) => {
    try {
        const {
            profile_name,
        } = req.body

        const profile = {
            profile_name,
        }
        await crudService.create('profile', profile)
        return ApiResponse(res, { message: 'Profile created', code: 201 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const updateProfile = async (req, res) => {
    try {
        const {
            profile_name,
        } = req.body

        const profile = {
            profile_name,
        }

        await crudService.update('profile', profile, 'profile_name', req.params.id)
        return ApiResponse(res, { message: 'Profile updated', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const deleteProfile = async (req, res) => {
    try {
        await crudService.remove('profile', 'profile_name', req.params.id)
        return ApiResponse(res, { message: 'Profile deleted', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

export default {
    getProfiles,
    createProfile,
    updateProfile,
    deleteProfile
}
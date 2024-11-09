import { crudService } from '../services/index.js'
import { ApiResponse } from '../utils/index.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const {
            user_email,
            user_password,
            user_name,
            user_address,
            user_phone
        } = req.body

       
        const salt = await bcrypt.genSalt(10);
	    const encrypt_password = await bcrypt.hash(user_password, salt);
        const user_role = "customer"
        const user = {
            user_email,
            user_password: encrypt_password,
            user_name,
            user_address,
            user_phone,
            user_role
        }
        await crudService.create('users', user)
        return ApiResponse(res, { message: 'User created', code: 201 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

const login = async (req, res) => {
    try {
        const {
            user_email,
            user_password
        } = req.body

        const user = await crudService.getByField('users', 'user_email', user_email)
        if (!user) {
            return ApiResponse(res, { message: 'User not found', code: 404 })
        }
     
        const validPassword = await bcrypt.compare(user_password, user.user_password);
        if (!validPassword) {
            return ApiResponse(res, { message: 'Invalid password', code: 400 })
        }

        const token = jwt.sign(
            { 
                user_email, 
                user_name: user.user_name, 
                user_address: user.user_address, 
                user_phone: user.user_phone, 
                user_role: user.user_role
         }, process.env.JWT_SECRET || 'secret')

        return ApiResponse(res, { data: { token }, message: 'User logged in', code: 200 })
    } catch (error) {
        return ApiResponse(res, { message: error.message, code: 400 })
    }
}

export default {
    register,
    login
}

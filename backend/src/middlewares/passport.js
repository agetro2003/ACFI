import { Strategy, ExtractJwt } from 'passport-jwt';
import { crudService } from '../services/index.js';

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET || 'secret',
};

const jwtVerify = async (payload, done) => {
	try {
		const user = await crudService.getByField('users', 'user_email', payload.user_email);
		if (!user) {
			return done(null, false, {
				status: 'error',
				message: 'You are unauthorized to access this resource',
			});
		}
		done(null, user);
	} catch (error) {
		done(error, false);
	}
};

const jwtStrategy = new Strategy(options, jwtVerify);

export default jwtStrategy;

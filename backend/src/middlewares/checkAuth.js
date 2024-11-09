import passport from 'passport';
import { ApiResponse } from '../utils/index.js';

const checkAuth = (roles) => {
	return (req, res, next) => {
		passport.authenticate('jwt', { session: false }, (err, user) => {
			req.user = user;

			if (err || !user) {
				req.user = { role: 'guest' };
			}

			if (!roles.includes(req.user.user_role)) {
				return ApiResponse(res, {
					message: 'You are unauthorized to access this resource',
					code: 401,
				});
			}

			next();
		})(req, res, next);
	};
};

export default checkAuth;

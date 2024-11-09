import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import passport from 'passport';
import { jwtStrategy } from './middlewares/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());
app.use(passport.initialize());
passport.use(jwtStrategy)


app.use('/', routes);

export default app;
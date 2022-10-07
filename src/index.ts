import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { DEV_SETTING, PROD_SETTING } from '@constants/index';
import AppDataSource from '@database/dataSource';
import errorHandler, { notFoundErrorHandler } from '@errors/errorHandler';
import userRouter from '@routes/user';
import cameraRouter from '@routes/camera';
import notificationRouter from '@routes/notification';

dotenv.config();

const isProdMode: boolean = process.env.NODE_ENV === 'production';
const REAL_SETTING = isProdMode ? PROD_SETTING : DEV_SETTING;

// DB
AppDataSource.initialize()
  .then(() => {
    console.log('DB Connection is Successful!');
  })
  .catch((err) => {
    console.error('Error during DB Connection', err);
  });

// Express
const app = express();

// Security
if (isProdMode) {
  app.use(hpp());
  app.use(helmet());
  app.enable('trust proxy');
}

// Logger
app.use(morgan(REAL_SETTING.morganMode));

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/user', userRouter);
app.use('/camera', cameraRouter);
app.use('/notification', notificationRouter);

// Check
app.get('/', (req, res) => {
  res.status(200).send('Welcome to My Server!');
});

// Error Handler
app.use(notFoundErrorHandler);
app.use(errorHandler);

// Server
app.listen(REAL_SETTING.port, () => {
  console.log(`server is running on ${REAL_SETTING.port}`);
});

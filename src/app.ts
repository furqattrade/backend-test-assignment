import express from 'express';
import itemController from './controllers/itemController';
import userController from './controllers/userController';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();

app.use(express.json());

// Routes
app.use('/items', itemController);
app.use('/users', userController);

// Error handling middleware
app.use(errorMiddleware);

export default app;

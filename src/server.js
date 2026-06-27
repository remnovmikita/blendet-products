import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import cors from 'cors';
import helmet from 'helmet';
import logger from './middlewares/logger.js';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import productsRoutes from './routes/productRoutes.js';
import { errors } from 'celebrate';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();



app.use(logger);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use(authRoutes);
app.use(productsRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});

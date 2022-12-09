import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errors } from 'celebrate';
import { userRouter } from './routes/userRouter.js';
import { cardRouter } from './routes/cardRouter.js';
import { createUser, login } from './controllers/user.js';
import { auth } from './middlewares/auth.js';
import { userBodyValidator, userLoginValidator } from './utils/validators.js';
import { errorMessages } from './utils/errorMessages.js';
import { NotFoundError } from './errors/NotFoundError.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const app = express();

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb', NODE_ENV = 'development' } = process.env;

// Выбор ключа
const config = dotenv.config({ path: NODE_ENV === 'production' ? '.env' : '.env.common' }).parsed;

app.set('config', config);

mongoose.set({ runValidators: true });
mongoose.connect(DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(
  {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
));

// Логгер запросов
app.use(requestLogger);

// Краш тест (временно)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Вызов роутов авторизации и регистрации (доступны до авторизации)
app.post('/signin', userLoginValidator, login);
app.post('/signup', userBodyValidator, createUser);

// Все, что ниже - доступно только для авторизованных пользователей
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.all('/*', (req, res, next) => {
  next(new NotFoundError(errorMessages.incorrectRoute));
});

// Логгер ошибок
app.use(errorLogger);

// Ошибок celebrate
app.use(errors());

// Централизованный обработчик ошибок
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

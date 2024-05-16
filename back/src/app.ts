import express from 'express';
import { router as itemRouter } from './routes/item'
import { router as userRouter } from './routes/user'
import { router as statusRouter } from './routes/status'
import { router as homeRouter } from './routes/home'

const app = express();

app.use(express.json());

//cors
app.use((_req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use('/api/items', itemRouter);
app.use('/api/users', userRouter);
app.use('/api', statusRouter);
app.use('/', homeRouter);

export default app;

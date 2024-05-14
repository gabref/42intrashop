import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

//test api
router.get('/test', (_req, res) => {
	try {
		res.status(200).json({ message: 'API is working' });
	} catch (error) {
		res.status(500).json({ message: error });
	}
});


//get all users
router.get('/users', async (_req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).json(users);

	} catch (error) {
		res.status(500).json({ message: error });
	}

});


//get user by id
router.get('/users/:id', async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: Number(req.params.id),
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

//create user
router.post('/users', async (req, res) => {
	try {
		const user = await prisma.user.create({
			data: {
				name: req.body.name,
				email: req.body.email
			},
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

//update user
router.put('/users/:id', async (req, res) => {
	try {
		const user = await prisma.user.update({
			where: {

				id: Number(req.params.id),
			},
			data: {
				name: req.body.name,
				email: req.body.email

			},
		});

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

//delete user
router.delete('/users/:id', async (req, res) => {

	try {
		const user = await prisma.user.delete({
			where: {
				id: Number(req.params.id),
			},
		});
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

export { router };

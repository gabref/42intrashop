import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function addItem(req: Request, res: Response) {
	const { name, description } = req.body;
	try {
		const item = await prisma.item.create({
			data: {
				name,
				description,
			},
		});
		res.status(201).json(item);
	} catch (error) {
		res.status(400).json({ error: error });
	}
}

export async function removeItem(req: Request, res: Response) {
	const { id } = req.params;
	try {
		await prisma.item.delete({ where: { id: Number(id) }});
		res.status(204).end();
	} catch (error) {
		res.status(400).json({ error: error });
	}
}

export async function updateItem(req: Request, res: Response) {
	const { id } = req.params;
	const { name, description } = req.body;
	try {
		const item = await prisma.item.update({
			where: { id: Number(id) },
			data: { name, description },
		});
		res.status(200).json(item);
	} catch (error) {
		res.status(400).json({ error: error });
	}
}

export async function getItemHistory(req: Request, res: Response) {
	const { id } = req.params;
	try {
		const history = await prisma.itemHistory.findMany({
			where: { itemId: Number(id) },
		});
		res.status(200).json(history);
	} catch (error) {
		res.status(400).json({ error });
	}
}

export async function addItemOption(req: Request, res: Response) {
	const { id } = req.params;
	const { type, value } = req.body;
	try {
		const option = await prisma.itemOption.create({
			data: {
				itemId: Number(id),
				type, 
				value,
			},
		});
		res.status(201).json(option);
	} catch (error) {
		res.status(400).json({ error });
	}
}

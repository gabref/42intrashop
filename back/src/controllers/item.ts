import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

type ItemData = {
	name: string;
	description: string | undefined;
	image: Buffer | undefined;
	imageUrl: string | undefined;
}

export async function getItem(req: Request, res: Response) {
	const { id } = req.params;
	try {
		const items = await prisma.item.findFirst(
			{ where: { id: Number(id) } }
		);
		res.status(200).json(items);
	} catch (error) {
		res.status(400).json({ error });
	}
}

export async function getItems(_req: Request, res: Response) {
	try {
		const items = await prisma.item.findMany();
		res.status(200).json(items);
	} catch (error) {
		res.status(400).json({ error });
	}
}

export async function addItem(req: Request, res: Response) {
	const { name, description, imageUrl } = req.body;
	const imageFile = req.file;

	let itemData: ItemData = {
		name,
		description,
		imageUrl: undefined,
		image: undefined,
	};

	if (imageUrl) {
		itemData.imageUrl = imageUrl;
	} else if (imageFile) {
		itemData.image = imageFile.buffer;
	}

	try {
		const item = await prisma.item.create({
			data: itemData,
		});
		res.status(201).json(item);
	} catch (error) {
		res.status(400).json({ error: error });
	}
}

export async function removeItem(req: Request, res: Response) {
	const { id } = req.params;
	try {
		await prisma.item.delete({ where: { id: Number(id) } });
		res.status(204).end();
	} catch (error) {
		res.status(400).json({ error: error });
	}
}

export async function updateItem(req: Request, res: Response) {
	const { id } = req.params;
	const { name, description, imageUrl } = req.body;
	const imageFile = req.file;

	let updateData: ItemData = {
		name, description,
		imageUrl: undefined,
		image: undefined,
	};

	if (imageUrl) {
		updateData.imageUrl = imageUrl;
	} else if (imageFile) {
		updateData.image = imageFile.buffer;
	}

	try {
		const itemBeforeUpdate = await prisma.item.findUnique({ where: { id: Number(id) } });

		if (!itemBeforeUpdate) {
			return res.status(404).json({ error: 'Item not found' });
		}

		const item = await prisma.item.update({
			where: { id: Number(id) },
			data: updateData,
		});

		const changes = [];
		if (name !== itemBeforeUpdate.name) changes.push(`name: "${itemBeforeUpdate.name}" -> "${name}"`);
		if (description !== itemBeforeUpdate.description) changes.push(`description: "${itemBeforeUpdate.description}" -> "${description}"`);
		if (imageUrl !== itemBeforeUpdate.imageUrl) changes.push(`imageUrl: "${itemBeforeUpdate.imageUrl}" -> "${imageUrl}"`);
		if (imageFile && imageFile.buffer !== itemBeforeUpdate.image) changes.push(`imageFile: "${itemBeforeUpdate.image}" -> "${imageFile}"`);

		if (changes.length > 0) {
			await prisma.itemHistory.create({
				data: {
					itemId: item.id,
					change: changes.join(';'),
				}
			});
		}

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

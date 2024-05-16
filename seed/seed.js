import { dirname, join } from 'path';
import axios from 'axios'
import { fileURLToPath } from 'url';
import { fileFromPath } from 'formdata-node/file-from-path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
	// Array of items to seed
	const items = [
		{
			name: 'Abbraccio da Frauu',
			description: 'Un meraviglioso fantasmagorico abbracio da frau',
			imageUrl: undefined,
			image: join(__dirname, 'assets', 'abbracciodaffrau.png'),
			options: [
				{ type: 'Color', value: 'Red', available: true },
				{ type: 'Size', value: 'M', available: true },
			],
			histories: [
				{ change: 'Created Item 1' },
			],
		},
		{
			name: 'Hoodie',
			description: 'Hoodie',
			imageUrl: undefined,
			image: join(__dirname, 'assets', 'hoodie.png'),
			options: [
				{ type: 'Color', value: 'Blue', available: true },
				{ type: 'Size', value: 'L', available: true },
			],
			histories: [
				{ change: 'Created Item 2' },
			],
		},
		{
			name: 'Rubberduck',
			description: 'Rubberduck',
			imageUrl: undefined,
			image: join(__dirname, 'assets', 'rubberduck.png'),
			options: [
				{ type: 'Color', value: 'Yellow', available: true },
			],
			histories: [
				{ change: 'Created Item 2' },
			],
		},
		{
			name: 'Shirt',
			description: 'Shirt',
			imageUrl: undefined,
			image: join(__dirname, 'assets', 'shirt.png'),
			options: [
				{ type: 'Color', value: 'Green', available: true },
				{ type: 'Size', value: 'M', available: true },
			],
			histories: [
				{ change: 'Created Item 2' },
			],
		},
		{
			name: 'Sticker',
			description: 'Sticker',
			imageUrl: undefined,
			image: join(__dirname, 'assets', 'sticker.png'),
			options: [
				{ type: 'Tipo', value: 'Stickoso', available: true },
			],
			histories: [
				{ change: 'Created Item 2' },
			],
		},
		{
			name: 'Totebag',
			description: 'Totebag',
			imageUrl: undefined,
			image: join(__dirname, 'assets', 'totebag.png'),
			options: [
				{ type: 'Color', value: 'Black', available: true },
				{ type: 'Size', value: 'BIG', available: true },
			],
			histories: [
				{ change: 'Created Totebag' },
			],
		},
	];

	const apiUrl = 'http://back:4000/api/items';

	for (const item of items) {
		const formData = new FormData();
		formData.append('name', item.name);
		formData.append('description', item.description);
		if (item.imageUrl) {
			formData.append('imageUrl', item.imageUrl);
		} else if (item.image) {
			formData.append('image', await fileFromPath(item.image));
		}

		try {
			const response = await axios.post(apiUrl, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			const createdItem = response.data;
			for (const option of item.options) {
				await axios.post(`${apiUrl}/${createdItem.id}/options`, option);
			}
			console.log(`Seeded item: ${item.name}`);
		} catch (error) {
			console.error(`Error seeding item: ${item.name}`, error.response?.data || error.message);
		}
	}

	console.log('Seeding completed!');
}

main().catch((e) => {
	console.error('Error seeding database', e);
	process.exit(1);
});

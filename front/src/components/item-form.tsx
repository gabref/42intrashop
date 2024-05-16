"use client";

import { useItems } from "@/hooks/use-items";
import { FormEvent, useState } from "react";

export function ItemForm() {
	const { addItem } = useItems();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [imageFile, setImageFile] = useState<File | null>(null);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (name === '')
			return;

		const itemData: {
			name: string;
			description?: string;
			imageUrl?: string;
			imageFile?: File;
		} = { name, description, imageUrl: imageUrl || undefined, imageFile: imageFile || undefined };
		await addItem(itemData);
		setName('');
		setDescription('');
		setImageUrl('');
		setImageFile(null);
	}

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<div className="mb-2">
				<label className="block text-sm font-medium">Name</label>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="w-full border p-2"
				/>
			</div>
			<div className="mb-2">
				<label className="block text-sm font-medium">Description</label>
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-full border p-2"
				/>
			</div>
			<div className="mb-2">
				<label className="block text-sm font-medium">Image URL</label>
				<input
					type="text"
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
					className="w-full border p-2"
				/>
			</div>
			<div className="mb-2">
				<label className="block text-sm font-medium">Image File</label>
				<input
					type="file"
					onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
					className="w-full border p-2"
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2"
			>
				Add Item
			</button>
		</form>
	)
}

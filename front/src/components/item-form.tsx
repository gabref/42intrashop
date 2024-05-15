"use client";

import { useItems } from "@/hooks/use-items";
import { FormEvent, useState } from "react";

export function ItemForm() {
	const { addItem } = useItems();
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (name === '')
			return;
		await addItem({ name, description });
		setName('');
		setDescription('');
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
			<button
				type="submit"
				className="bg-blue-500 text-white px-4 py-2"
			>
				Add Item
			</button>
		</form>
	)
}

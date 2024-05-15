"use client";

import { addItemOption } from "@/services/item-service";
import { FormEvent, useState } from "react";

interface ItemOptionsProps {
	itemId: number;
}

export function ItemOptionsAdder({ itemId }: ItemOptionsProps) {
	const [type, setType] = useState('');
	const [value, setValue] = useState('');

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		await addItemOption(itemId, { type, value });
		setType('');
		setValue('');
	}

	return (
		<form onSubmit={handleSubmit} className="mb-4">
			<h2 className="text-xl font-bold mb-2">Add Item Option</h2>
			<div className="mb-2">
				<label className="block text-sm font-medium">Type</label>
				<input
					type="text"
					value={type}
					onChange={(e) => setType(e.target.value)}
					className="w-full border p-2"
				/>
			</div>
			<div className="mb-2">
				<label className="block text-sm font-medium">Value</label>
				<input
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className="w-full border p-2"
				/>
			</div>
			<button type="submit" className="bg-blue-500 text-white px-4 py-2">
				Add Option
			</button>
		</form>
	);
}

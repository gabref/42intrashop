"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Item, getItem, updateItem } from '@/services/item-service';
import Link from 'next/link';

type UpdateItemProps = {
	itemId: number;
};

export default function UpdateItem({ itemId }: UpdateItemProps) {
	const [item, setItem] = useState<Item | null>(null);
	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [imageUrl, setImageUrl] = useState<string>('');
	const [imageFile, setImageFile] = useState<File | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const fetchedItem = await getItem(itemId);
				setItem(fetchedItem);
				setName(fetchedItem.name);
				setDescription(fetchedItem.description || '');
				setImageUrl(fetchedItem.imageUrl || '');
				setImageFile(undefined);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching item:', error);
				setLoading(false);
			}
		};
		fetchItem();
	}, [itemId]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await updateItem(itemId, { name, description, imageUrl, imageFile });
			router.push(`/items/${itemId}`);
		} catch (error) {
			console.error('Error updating item:', error);
		}
	};

	if (loading) return <div>Loading...</div>;
	if (!item) return <div>Item not found</div>;

	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-4">Update Item</h1>

			<div className="flex justify-between items-center">
				<div className="flex flex-row gap-4">
					<div>
						{imageUrl && (
							<img src={imageUrl} alt={name} className="w-20 h-20 object-cover mt-2" />
						)}
						{item.image && (
							<img
								src={`data:image/jpeg;base64,${Buffer.from(item.image).toString('base64')}`}
								alt={name}
								className="w-20 h-20 object-cover mt-2"
							/>
						)}
					</div>
					<div>
						<h2 className="text-xl font-bold">{name}</h2>
						<p className="text-gray-600">{description || 'No description available'}</p>
						<Link className="text-blue-500 hover:underline mt-4" href={`/items/${item.id}`}>
							View Details
						</Link>
					</div>
				</div>
			</div>

			<form onSubmit={handleSubmit} className="bg-white p-6 rounded mt-8 shadow-md max-w-md">
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full border rounded p-2"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full border rounded p-2"
						rows={4}
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
						onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : undefined) }
						className="w-full border p-2"
					/>
				</div>
				<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
					Update Item
				</button>
			</form>
		</div>
	);
}

"use client";

import ItemDetail from '@/components/item-details';
import { Item, getItem } from '@/services/item-service';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ItemDetailPage({ params }: { params: { id: number } }) {
	const [item, setItem] = useState<Item | null>(null);

	useEffect(() => {
		const fetchItem = async () => {
			try {
				const fetchedItem = await getItem(params.id);
				setItem(fetchedItem);
			} catch (error) {
				console.error('Error fetching item:', error);
			}
		};
		fetchItem();
	}, []);

	return (
		<>
			<div className="flex justify-between items-center">
				{item && (
					<div className="flex flex-row gap-4 ">
						<div>
							{item.imageUrl && (
								<img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover mt-2" />
							)}
							{item.image && (
								<img
									src={`data:image/jpeg;base64,${Buffer.from(item.image).toString('base64')}`}
									alt={item.name}
									className="w-20 h-20 object-cover mt-2"
								/>
							)}
						</div>
						<div>
							<h2 className="text-xl font-bold">{item.name}</h2>
							<p className="text-gray-600">{item.description || 'No description available'}</p>
							<Link className="text-blue-500 hover:underline mt-4" href={`/items/${item.id}`}>
								View Details
							</Link>
							<br />
							<Link className="text-blue-500 hover:underline mt-4" href={`/items/${item.id}/edit`}>
								Edit Item
							</Link>
						</div>
					</div>
				)}
			</div>

			<ItemDetail itemId={Number(params.id)} />
		</>

	)
}

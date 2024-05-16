"use client";

import { useItems } from "@/hooks/use-items";
import Link from "next/link";

export function ItemList() {
	const { items, loading, removeItem } = useItems();

	if (loading) return <div>Loading...</div>;

	return (
		<div className="container mx-auto mt-8">
			<ul>
				{items.map((item) => (
					<li key={item.id} className="border p-4 mb-4">
						<div className="flex justify-between items-center">
							<div className="flex flex-row gap-4">
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
								</div>
							</div>
							<button
								className="bg-red-500 text-white px-2 py-1"
								onClick={() => removeItem(item.id)}
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

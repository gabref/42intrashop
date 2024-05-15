"use client";

import { useItems } from "@/hooks/use-items";

export function ItemList() {
	const { items, loading, removeItem } = useItems();

	if (loading) return <div>Loading...</div>;

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Items</h1>
			<ul>
				{items.map((item) => (
					<li key={item.id} className="border p-2 mb-2">
						<div className="flex justify-between">
							<div>
								<h2 className="font-semibold">{item.name}</h2>
								<p>{item.description}</p>
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

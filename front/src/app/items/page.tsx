"use client";

import { ItemList } from '@/components/item-list';

export default function ListItemsPage() {
	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-4">List Items</h1>
			<ItemList />
		</div>
	);
}

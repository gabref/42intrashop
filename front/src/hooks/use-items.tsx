"use client";

import { Item, addItem, addItemOption, getItemHistory, getItems, removeItem, updateItem } from "@/services/item-service";
import { useEffect, useState } from "react";

export function useItems() {
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchItems() {
			setLoading(true);
			const data = await getItems();
			setItems(data);
			setLoading(false);
		}
		fetchItems();
	}, []);

	return {
		items,
		loading,
		addItem,
		removeItem,
		updateItem,
		getItemHistory,
		addItemOption,
	};
}

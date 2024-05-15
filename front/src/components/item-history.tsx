"use client";

import { ItemHistory, getItemHistory } from "@/services/item-service";
import { useEffect, useState } from "react";

interface ItemHistoryProps {
	itemId: number;
}

export function ItemHistoryComponent({ itemId }: ItemHistoryProps) {
	const [history, setHistory] = useState<ItemHistory[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchHistory() {
			setLoading(true);
			const data = await getItemHistory(itemId);
			setHistory(data);
			setLoading(false);
		}
		fetchHistory();
	}, [itemId]);

	if (loading) return <div>Loading...</div>

	return (
		<div>
			<h2 className="text-xl font-bold mb-2">Item History</h2>
			<ul>
				{history.map(record => (
					<li key={record.id} className="border p-2 mb-2">
						<p>{record.change}</p>
						<p className="text-sm text-gray-600">
							{new Date(record.changedAt).toLocaleString()}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}

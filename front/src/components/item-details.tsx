import { useEffect, useState } from 'react';
import { Item, ItemHistory, ItemOption, getItem, getItemHistory } from '@/services/item-service';

type ItemDetailProps = {
	itemId: number;
};

export default function ItemDetail({ itemId }: ItemDetailProps) {
	const [item, setItem] = useState<Item | null>(null);
	const [history, setHistory] = useState<ItemHistory[]>([]);
	const [options, setOptions] = useState<ItemOption[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {

			try {
				const fetchedItem = await getItem(itemId);
				const fetchedHistory = await getItemHistory(itemId);
				// const fetchedOptions = await getItemOptions(itemId);
				setItem(fetchedItem);
				setHistory(fetchedHistory);
				// setOptions(fetchedOptions);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching item data:', error);
				setLoading(false);
			}
		};
		fetchData();
	}, [itemId]);

	if (loading) return <div>Loading...</div>;
	if (!item) return <div>Item not found</div>;

	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-4">{item.name}</h1>
			<p className="text-lg mb-4">{item.description}</p>
			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-2">Options</h2>
				{/* <ul> */}
				{/*   {options.map((option) => ( */}
				{/*     <li key={option.id} className="border p-2 mb-2 bg-white rounded shadow"> */}
				{/*       <strong>Type:</strong> {option.type} <br /> */}
				{/*       <strong>Value:</strong> {option.value} <br /> */}
				{/*       <strong>Available:</strong> {option.available ? 'Yes' : 'No'} */}
				{/*     </li> */}
				{/*   ))} */}
				{/* </ul> */}
			</div>
			<div>
				<h2 className="text-xl font-bold mb-2">Item History</h2>
				{history.length == 0 ? (
					<div>No update history yet!</div>
				) : (
					<ul>
						{history.slice().reverse().map(record => (
							<li key={record.id} className="border p-2 mb-2">
								{record.change.split(';').map(change => (
									<p>{change}</p>
								))}
								<p className="text-sm text-gray-600">
									{new Date(record.changedAt).toLocaleString()}
								</p>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

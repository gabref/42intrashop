import { ItemForm } from "@/components/item-form";
import { ItemList } from "@/components/item-list";

export default function Home() {
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Inventory Management</h1>
			<ItemForm />
			<ItemList />
		</div>
	);
}

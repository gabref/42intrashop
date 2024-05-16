import Link from 'next/link';

export default function HomePage() {
	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-4">Welcome to MyApp</h1>
			<p className="text-lg mb-4">MyApp is a simple application for managing items.</p>
			<p className="text-lg mb-4">Features:</p>
			<ul className="list-disc ml-6">
				<li>List items</li>
				<li>Add new items</li>
				<li>Manage item details</li>
			</ul>
			<div className="mt-8">
				<Link className="text-blue-500 hover:underline" href="/items">
					View Items
				</Link>
				<span className="mx-4">|</span>
				<Link className="text-blue-500 hover:underline" href="/add-item">
					Add New Item
				</Link>
			</div>
		</div>
	);
}

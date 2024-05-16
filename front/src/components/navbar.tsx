"use client";

import Link from 'next/link';

export function Navbar() {
	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-xl font-bold">MyApp</div>
				<div className="flex space-x-4">
					<Link className="text-white hover:text-gray-300" href="/">
						Home
					</Link>
					<Link className="text-white hover:text-gray-300" href="/items">
						List Items
					</Link>
					<Link className="text-white hover:text-gray-300" href="/add-item">
						Add Item
					</Link>
				</div>
				<div>
					<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400">
						Login
					</button>
				</div>
			</div>
		</nav>
	);
}

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ItemForm } from '@/components/item-form';
import { addItem } from '@/services/item-service';

export default function AddItemPage() {

	return (
		<div className="container mx-auto mt-8">
			<h1 className="text-3xl font-bold mb-4">Add Item</h1>
			<ItemForm />
		</div>
	);
}

"use client";

import UpdateItem from '@/components/item-update';

export default function UpdateItemPage({ params }: { params: { id: number } }) {

	return <UpdateItem itemId={params.id} />;
}


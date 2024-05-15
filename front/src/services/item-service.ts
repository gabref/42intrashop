import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:4000/api',
});

export type Item = {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type ItemHistory = {
    id: number;
    itemId: number;
    change: string;
    changedAt: Date;
};

export type ItemOption = {
    id: number;
    itemId: number;
    type: string;
    value: string;
    available: boolean;
};

export async function getItems() {
	const response = await api.get<Item[]>('/items');
	return response.data;
}

export async function addItem(item: { name: string; description?: string }) {
	const response = await api.post<Item>('/items', item);
	return response.data;
}

export async function removeItem(id: number) {
	const response = await api.delete(`/items/${id}`);
	return response.data;
}

export async function updateItem(id: number, item: { name: string, description?: string }) {
	const response = await api.put<Item>(`/items/${id}`, item);
	return response.data;
}

export async function getItemHistory(id: number) {
	const response = await api.get<ItemHistory[]>(`/items/${id}/history`);
	return response.data;
}

export async function addItemOption(id: number, option: { type: string, value: string }) {
	const response = await api.post<ItemOption[]>(`/items/${id}/options`, option);
	return response.data;
}

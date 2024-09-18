"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { BudgetRequest } from "@/models/budget-request";
import { createBudgetItem } from "@/services/budget-item";
import { useRouter } from 'next/navigation';

function AddItem() {
  const router = useRouter();
  // Add a new budget request
  const addRequest = async (newRequest: Omit<BudgetRequest, 'id'>) => {
    try {
      await createBudgetItem(newRequest);
      router.push('/'); // นำทางไปที่หน้า '/'
    } catch (err: any) {
      const messages = err.response?.data?.message || 'Failed to create item';
      alert(`Failed to create - reason: ${JSON.stringify(messages)}`);
    }
  };

  // Define the state for the new budget request
  const [newRequest, setNewRequest] = useState<Omit<BudgetRequest, 'id'>>({
    title: "",
    amount: 5,
    quantity: 1,
    status: "PENDING",
  });

  // Update form fields
  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.type === "number"
        ? Number(event.target.value)
        : event.target.value;
    setNewRequest({
      ...newRequest,
      [event.target.name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addRequest({
      title: newRequest.title,
      amount: newRequest.amount,
      quantity: newRequest.quantity,
      status: "PENDING",
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add new Budget Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={newRequest.title}
            onChange={updateField}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={newRequest.amount}
            onChange={updateField}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={newRequest.quantity}
            onChange={updateField}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItem;

"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BudgetPanel from "@/components/BudgetPanel";
import BudgetRequestDataTable from "../components/BudgetRequestDataTable";
import { BudgetRequest } from "@/models/budget-request";
import { createBudgetItem, fetchBudgetItems } from "@/services/budget-item";

let nextId = 3;
function Home() {
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);

  useEffect(() => {
    fetchBudgetItems().then((items) => setBudgetRequests(items));
  }, []);

  const addRequest = async (newRequest: BudgetRequest) => {
    try {
      const insertedRequest = await createBudgetItem({
        title: newRequest.title,
        quantity: newRequest.quantity,
        price: newRequest.price,
      });
      setBudgetRequests([...budgetRequests, insertedRequest]);
    } catch (err: any) {
      const messsages = err.response.data.message;

      alert(`Fail to create - reason ${JSON.stringify(messsages)}`);
    }
  };

  const [newRequest, setNewRequest] = useState<BudgetRequest>({
    id: 0,
    title: "",
    price: 0,
    quantity: 1,
    status: "APPROVED",
  });

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addRequest({
      id: nextId++,
      title: newRequest.title,
      price: newRequest.price,
      quantity: 1,
      status: "APPROVED",
    });
  };

  return (
    <div>
      <main className="container mx-auto">
        <div className="mt-4">
          <BudgetPanel items={budgetRequests} />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            Title:
            <input
              name="title"
              value={newRequest.title}
              onChange={updateField}
            />
          </div>
          <div>
            Amount:
            <input
              name="price"
              type="number"
              value={newRequest.price}
              onChange={updateField}
            />
          </div>
          <button>Add</button>
        </form>
        <div className="mt-4">
          <BudgetRequestDataTable items={budgetRequests} />
        </div>
      </main>
    </div>
  );
}

export default Home;

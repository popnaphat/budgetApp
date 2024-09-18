"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useParams,useRouter } from 'next/navigation'; 
import { fetchBudgetItem, updateBudgetItem, BudgetItemID } from "@/services/budget-item";
import { BudgetRequest } from "@/models/budget-request";
import { useEffect, useState } from "react";
import { useAuth } from '@/app/context/AuthContext';

type FormData = {
  title: string;
  quantity: number;
  amount: number;
};

function EditBudgetRequest() {
  const { clearExpired } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id; // ดึง 'id' จากพารามิเตอร์
  const numericId = Number(id); // แปลงเป็นตัวเลข

  const [budgetRequest, setBudgetRequest] = useState<BudgetRequest | null>(null);

  useEffect(() => {
    if (id && !isNaN(numericId)) { // ตรวจสอบ id
      let isMounted = true;
      const fetchData = async () => {        
        try {
          const item = await fetchBudgetItem({ id: numericId }); // ใช้ numericId
          if (isMounted) { // ตรวจสอบว่า component ยังคง mounted
            setBudgetRequest(item);
          }
        } catch (error) {
          console.error("Error fetching budget item:", error);
          if (isMounted) {
            await clearExpired();
            router.push("/login"); // นำทางเมื่อเกิด error และ component ยังคง mounted
          }
        }
      };
      fetchData();
      return () => {
        isMounted = false; // cleanup เมื่อ component unmounts
      };
    }
  }, []); // ทำงานเมื่อ id หรือ numericId เปลี่ยนแปลง


  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      title: budgetRequest?.title || "",
      quantity: budgetRequest?.quantity || 5,
      amount: budgetRequest?.amount || 1,
    },
  });

  useEffect(() => {
    let isMounted = true; // สร้าง flag เพื่อตรวจสอบว่า component ยังคง mounted อยู่
  
    if (budgetRequest && isMounted) {
      reset({
        title: budgetRequest.title,
        quantity: budgetRequest.quantity,
        amount: budgetRequest.amount,
      });
      //console.log(budgetRequest);
    }
  
    return () => {
      isMounted = false; // cleanup เมื่อ component unmounts
    };
  }, [budgetRequest, reset]);
  
  const updateRequest = async (id: BudgetItemID, newRequest: BudgetRequest) => {
    try {
      // console.log(newRequest)
      await updateBudgetItem(id, newRequest);
      router.push('/'); // นำทางไปที่หน้า '/'
    } catch (err: any) {
      const messages = err.response?.data?.message || 'Failed to create item';
      alert(`Failed to create - reason: ${JSON.stringify(messages)}`);
    }
  };
  const onSubmit = (data: FormData) => {
    if (budgetRequest) {
      const updatedRequest: BudgetRequest = {
        ...budgetRequest, // Preserve existing fields like id, status
        title: data.title,
        quantity: Number(data.quantity),
        amount: Number(data.amount),
      };
      
      const budgetItemID: BudgetItemID = { id: updatedRequest?.id }; // Create BudgetItemID object
      // console.log(updatedRequest)
      
      updateRequest(budgetItemID, updatedRequest); // Call updateRequest with complete data
    }
  };
  

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Budget Request</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-lg font-medium ">
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: true, minLength: 3 })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.type === "required" && "Title is required"}
                  {errors.title.type === "minLength" && "Title must be at least 3 characters"}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="quantity" className="block text-lg font-medium ">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                {...register("quantity", { required: true, min: 1 })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              />
              {errors.quantity && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.quantity.type === "required" && "Quantity is required"}
                  {errors.quantity.type === "min" && "Quantity must be greater than 0"}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="amount" className="block text-lg font-medium ">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                {...register("amount", { required: true, min: 1 })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.amount.type === "required" && "Amount is required"}
                  {errors.amount.type === "min" && "Amount must be greater than 0"}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
              <Link
                href="/"
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default EditBudgetRequest;


"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { formatDecimal } from "@/lib/format-decimal";
import { BudgetRequest } from "@/models/budget-request";
import { useRouter } from "next/navigation";
import {
  fetchBudgetItems,
  updateBudgetItemStatus,
} from "@/services/budget-item";

interface BudgetRequestDataTableProps {
  items: BudgetRequest[];
  handleClick: (id: number, state: "APPROVED" | "REJECTED") => void;
}

function BudgetRequestPending({
  items,
  handleClick,
}: BudgetRequestDataTableProps) {
  return (
    <div className="mt-4 mx-4 overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-4 py-4 text-center text-xs font-medium text-gray-600 uppercase tracking-wider sm:w-1/4 md:w-1/6 lg:w-1/12">Approval</th>
            <th className="px-4 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider sm:w-1/4 md:w-1/6 lg:w-1/12">
              Id
            </th>
            <th className="px-4 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider sm:w-1/2 md:w-1/3 lg:w-1/4">
              Title
            </th>
            <th className="px-4 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider sm:w-1/2 md:w-1/3 lg:w-1/4">
              Budget
            </th>
            <th className="px-4 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider sm:w-1/2 md:w-1/3 lg:w-1/4">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items
            .filter((request) => request.status === "PENDING")
            .map((request, index) => (
              <tr
                key={request.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-2 whitespace-nowrap">
            <button
              className="bg-green-500 text-white hover:bg-green-600 transition-colors px-3 py-1 rounded mr-2 text-xs"
              onClick={() => handleClick(request.id, "APPROVED")}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white hover:bg-red-600 transition-colors px-3 py-1 rounded text-xs"
              onClick={() => handleClick(request.id, "REJECTED")}
            >
              Reject
            </button>
          </td>
          <td className="px-4 py-2 whitespace-nowrap text-right font-medium text-gray-700 text-xs sm:text-sm">
            {request.id}
          </td>
          <td className="px-4 py-2 whitespace-nowrap font-semibold text-gray-800 text-xs sm:text-sm">
            {request.title} - {request.quantity} units
          </td>
          <td className="px-4 py-2 whitespace-nowrap text-right font-medium text-indigo-600 text-xs sm:text-sm">
            {formatDecimal(request.amount)}
          </td>
          <td className="px-4 py-2 whitespace-nowrap text-right text-xs sm:text-sm">
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                request.status === "APPROVED"
                  ? "bg-green-100 text-green-800"
                  : request.status === "REJECTED"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {request.status}
            </span>
          </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

function Approval() {
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);
  const { clearExpired } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true; // ใช้ flag เพื่อป้องกันการ set state บน component ที่ถูก unmount ไปแล้ว
    const fetchData = async () => {
      try {
        const items = await fetchBudgetItems(); // รอข้อมูลจาก fetchBudgetItems
        if (isMounted) {
          // ตรวจสอบว่า component ยังคง mounted
          setBudgetRequests(items);
        }
      } catch (err) {
        if (isMounted) {
          // ตรวจสอบว่า component ยังคง mounted
          await clearExpired();
          router.push("/login"); // นำทางเมื่อเกิด error และ component ยังคง mounted
        }
      }
    };

    fetchData(); // เรียกใช้ฟังก์ชัน

    return () => {
      isMounted = false; // cleanup เมื่อ component unmounts
    };
  }, [clearExpired, router]); // ใส่ clearExpired และ router ใน dependency array

  const handleClick = async (id: number, state: "APPROVED" | "REJECTED") => {
    try {
      await updateBudgetItemStatus({ id }, state);
      // หลังจากการอัปเดตสำเร็จ รีเฟรชข้อมูล
      const items = await fetchBudgetItems();
      setBudgetRequests(items);
    } catch (err) {
      // จัดการข้อผิดพลาดที่เกิดขึ้น
      console.error("Failed to update status:", err);
    }
  };

  return (
    <div>
      <BudgetRequestPending items={budgetRequests} handleClick={handleClick} />
    </div>
  );
}

export default Approval;

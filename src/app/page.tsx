"use client";

import { useEffect, useState } from "react";
import BudgetPanel from "@/components/BudgetPanel";
import BudgetRequestDataTable from "../components/BudgetRequestDataTable";
import { BudgetRequest } from "@/models/budget-request";
import {fetchBudgetItems } from "@/services/budget-item";
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation'; 
function Home() {
  const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);
  const { clearExpired } = useAuth();
  const router = useRouter();
  useEffect(() => {
    let isMounted = true; // ใช้ flag เพื่อป้องกันการ set state บน component ที่ถูก unmount ไปแล้ว
  
    const fetchData = async () => {
      try {
        const items = await fetchBudgetItems(); // รอข้อมูลจาก fetchBudgetItems
        if (isMounted) { // ตรวจสอบว่า component ยังคง mounted
          setBudgetRequests(items);
        }
      } catch (err) {
        if (isMounted) { // ตรวจสอบว่า component ยังคง mounted
          await clearExpired();
          router.push("/login"); // นำทางเมื่อเกิด error และ component ยังคง mounted
        }
      }
    };
  
    fetchData(); // เรียกใช้ฟังก์ชัน
  
    return () => {
      isMounted = false; // cleanup เมื่อ component unmounts
    };
  }, []); // ใส่ clearExpired และ router ใน dependency array



  return (
    <div>
      <main className="container mx-auto">
        <div className="mt-4 mx-4">
          <BudgetPanel items={budgetRequests} />
        </div>
        
        <div className="mt-4 mx-4">
          <BudgetRequestDataTable items={budgetRequests} />
        </div>
      </main>
    </div>
  );
}

export default Home;

import { api } from "@/lib/api";
import { BudgetRequest } from "@/models/budget-request";


export const fetchBudgetItems = async (): Promise<BudgetRequest[]> => {
  try {
    const response = await api.get<BudgetRequest[]>("/items", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    // trigger logout เมื่อเกิดข้อผิดพลาด
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดที่ไม่คาดคิด"
    );
  }
};
export interface BudgetItemID {
  id: number;
}
export const fetchBudgetItem = async (
  BudgetItemID: BudgetItemID
): Promise<BudgetRequest> => {
  try {
    const response = await api.get<BudgetRequest>(`/items/${BudgetItemID.id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดที่ไม่คาดคิด"
    );
  }
};

interface CreateBudgetItemRequest {
  title: string;
  quantity: number;
  amount: number;
}

export const createBudgetItem = async (body: CreateBudgetItemRequest) => {
  try {
    const response = await api.post<BudgetRequest>("/items", body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดที่ไม่คาดคิด"
    );
  }
};

export const updateBudgetItem = async (BudgetItemID: BudgetItemID, body: CreateBudgetItemRequest) => {
  // console.log(body)
  try {
    const response = await api.put<BudgetRequest>(`/items/${BudgetItemID.id}`, body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดที่ไม่คาดคิด"
    );
  }
};


export const updateBudgetItemStatus = async (BudgetItemID: BudgetItemID, status: "APPROVED" | "REJECTED") => {
  try {
    const response = await api.patch<BudgetRequest>(`/items/${BudgetItemID.id}`, { status }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "เกิดข้อผิดพลาดที่ไม่คาดคิด"
    );
  }
};


export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  message: string;
}
export interface LogoutResponse {
  message: string;
}

export const login = async (body: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/login", body, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    // Extract message from error response if available
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};
export const logout = async (): Promise<LogoutResponse> => {
  try {
    const response = await api.get<LogoutResponse>("/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    // Extract message from error response if available
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    throw new Error(message);
  }
};

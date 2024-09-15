import { api } from "@/lib/api";
import { BudgetRequest } from "@/models/budget-request";

interface FetchBudgetItemsResponse {
  data: BudgetRequest[];
}

export const fetchBudgetItems = async (): Promise<BudgetRequest[]> => {
  const response = await api.get<FetchBudgetItemsResponse>("/items");
  const { data } = response.data;
  return data;
};

interface CreateBudgetItemRequest {
  title: string;
  quantity: number;
  price: number;
}

interface CreateBudgetItemResponse {
  data: BudgetRequest;
}

export const createBudgetItem = async (body: CreateBudgetItemRequest) => {
  const response = await api.post<CreateBudgetItemResponse>("/items", body);
  const { data } = response.data;
  return data;
};

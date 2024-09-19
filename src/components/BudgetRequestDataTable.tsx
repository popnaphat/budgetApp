import { formatDecimal } from "@/lib/format-decimal";
import { BudgetRequest } from "@/models/budget-request";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface BudgetRequestDataTableProps {
  items: BudgetRequest[];
}

function BudgetRequestDataTable({ items }: BudgetRequestDataTableProps) {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/edit/${id}`);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-4 py-4 text-left text-s font-medium text-gray-600 uppercase tracking-wider sm:w-1/4 md:w-1/6 lg:w-1/12">
              Edit
            </th>
            <th className="px-4 py-4 text-right text-s font-medium text-gray-600 uppercase tracking-wider sm:w-1/4 md:w-1/6 lg:w-1/12">
              Id
            </th>
            <th className="px-4 py-4 text-left text-s font-medium text-gray-600 uppercase tracking-wider sm:w-1/2 md:w-1/3 lg:w-1/4">
              Title
            </th>
            <th className="px-4 py-4 text-right text-s font-medium text-gray-600 uppercase tracking-wider sm:w-1/2 md:w-1/3 lg:w-1/4">
              Budget
            </th>
            <th className="px-4 py-4 text-right text-s font-medium text-gray-600 uppercase tracking-wider sm:w-1/2 md:w-1/3 lg:w-1/4">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((request, index) => (
            <tr
              key={request.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition-colors`}
            >
              <td className="px-4 py-4 text-left text-s font-medium text-gray-600 uppercase tracking-wider sm:w-1/4 md:w-1/6 lg:w-1/12">
                <button
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => handleClick(request.id)} // Replace `item.id` with the actual id you are using
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </td>
              <td className="px-4 py-4 text-right text-s font-medium text-gray-600 uppercase tracking-wider sm:w-1/4 md:w-1/6 lg:w-1/12">
                {request.id}
              </td>
              <td className="px-4 py-4 text-left text-s font-medium text-gray-600 uppercase tracking-wider sm:w-1/2 md:w-1/3 lg:w-1/4">
                {request.title} - {request.quantity} units
              </td>
              <td className="px-4 py-4 text-right text-s font-medium text-gray-600 uppercase tracking-wider sm:w-1/2 md:w-1/3 lg:w-1/4">
                {formatDecimal(request.amount)}
              </td>
              <td className="px-4 py-4 text-right text-s font-medium text-gray-600 uppercase tracking-wider sm:w-1/2 md:w-1/3 lg:w-1/4">
                <span
                  className={`px-2 inline-flex text-s leading-5 font-semibold rounded-full ${
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

export default BudgetRequestDataTable;

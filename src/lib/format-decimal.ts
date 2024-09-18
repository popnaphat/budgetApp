export function formatDecimal(value: number): string {
  // ใช้ Intl.NumberFormat เพื่อจัดรูปแบบตัวเลข
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}


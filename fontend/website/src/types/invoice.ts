// src/types/invoice.ts (Giả định)
export interface InvoiceItemData {
  invoiceNumber: string;
  amount: number;
  month: string; // Ví dụ: '09-2025'
  serial: string;
  invoiceCode: string;
  issueDate: string; // Ví dụ: '01/10/2025 00:00'
  secretCode: string;
  status: 'Đã thanh toán' | 'Chưa thanh toán' | 'Quá hạn';
}
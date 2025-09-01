import React from "react";
import { useInvoiceContext } from "../context/InvoiceContext";

const InvoicePreview = () => {
  const {
    clientInfo = { name: "", address: "" },
    invoiceInfo = { number: "", date: "" },
    items = [],
    subtotal = 0,
    taxRate = 0,
  } = useInvoiceContext();

  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div
      id="invoice"
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-gray-900"
    >
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Invoice Preview</h1>

      {/* Client Info */}
      <div className="mb-6">
        <p className="font-semibold">
          Client: <span className="font-normal">{clientInfo?.name}</span>
        </p>
        <p className="text-sm text-gray-700">{clientInfo?.address}</p>
      </div>

      {/* Invoice Info */}
      <div className="mb-6">
        <p>
          <strong>Invoice #:</strong> {invoiceInfo?.number}
        </p>
        <p>
          <strong>Date:</strong> {invoiceInfo?.date}
        </p>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full min-w-[500px] border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="border px-3 py-2 text-left">Description</th>
              <th className="border px-3 py-2 text-center">Qty</th>
              <th className="border px-3 py-2 text-right">Rate</th>
              <th className="border px-3 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-3 py-2">{item.description}</td>
                <td className="border px-3 py-2 text-center">
                  {item.quantity}
                </td>
                <td className="border px-3 py-2 text-right">
                  {item.rate.toFixed(2)}
                </td>
                <td className="border px-3 py-2 text-right">
                  {(item.quantity * item.rate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="text-right space-y-1">
        <p>
          <strong>Subtotal:</strong> {subtotal.toFixed(2)}
        </p>
        <p>
          <strong>Tax ({(taxRate * 100).toFixed(0)}%):</strong> {tax.toFixed(2)}
        </p>
        <p className="text-xl font-bold text-green-600">
          <strong>Total:</strong> {total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default InvoicePreview;

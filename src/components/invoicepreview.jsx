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
      className="bg-white p-6 rounded shadow border border-gray-300"
    >
      <h2 className="text-2xl font-bold mb-4">Invoice</h2>

      {/* Client Info */}
      <div className="mb-4">
        <p>
          <strong>Client:</strong> {clientInfo?.name || ""}
        </p>
        <p>{clientInfo?.address || ""}</p>
      </div>

      {/* Invoice Info */}
      <div className="mb-4">
        <p>
          <strong>Invoice #:</strong> {invoiceInfo?.number || ""}
        </p>
        <p>
          <strong>Date:</strong> {invoiceInfo?.date || ""}
        </p>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-3 py-2 text-left">
              Description
            </th>
            <th className="border border-gray-300 px-3 py-2 text-center">
              Qty
            </th>
            <th className="border border-gray-300 px-3 py-2 text-right">
              Rate
            </th>
            <th className="border border-gray-300 px-3 py-2 text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td className="border border-gray-300 px-3 py-2">
                {item.description}
              </td>
              <td className="border border-gray-300 px-3 py-2 text-center">
                {item.quantity}
              </td>
              <td className="border border-gray-300 px-3 py-2 text-right">
                {item.rate.toFixed(2)}
              </td>
              <td className="border border-gray-300 px-3 py-2 text-right">
                {(item.quantity * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="text-right">
        <p>
          <strong>Subtotal:</strong> {subtotal.toFixed(2)}
        </p>
        <p>
          <strong>Tax:</strong> {tax.toFixed(2)}
        </p>
        <p className="text-xl font-bold">
          <strong>Total:</strong> {total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default InvoicePreview;

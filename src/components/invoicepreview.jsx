import React, { useRef } from "react";
import { useInvoiceContext } from "../context/InvoiceContext";
import ExportPDF from "./exportpdf";

const currency = (n) =>
  (Number(n) || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export default function InvoicePreview() {
  const { clientInfo, items, taxRate, subtotal } = useInvoiceContext();
  const ref = useRef(null);

  // Correct tax calculation
  const tax = +(subtotal * (taxRate / 100)).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <div className="space-y-6 p-4 bg-gray-100 min-h-screen">

      {/* INVOICE PREVIEW */}
      <div
        ref={ref}
        id="invoice-pdf"
        className="
          bg-white
          p-6
          rounded-lg
          shadow-md
          mx-auto
          w-full
          max-w-[800px]
        "
      >
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Invoice Preview
        </h2>

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mb-6">
          <div>
            <p className="font-semibold">From:</p>
            <p>Your Company Name</p>
            <p>123 Main St, City, Country</p>
          </div>

          <div>
            <p className="font-semibold">Bill To:</p>
            <p>{clientInfo.name || "—"}</p>
            <p>{clientInfo.address || "—"}</p>
          </div>
        </div>

        {/* ITEMS TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-left">Description</th>
                <th className="p-2 border w-16">Qty</th>
                <th className="p-2 border w-28">Rate</th>
                <th className="p-2 border w-32">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i}>
                  <td className="p-2 border">{it.description}</td>
                  <td className="p-2 border text-center">{it.quantity}</td>
                  <td className="p-2 border text-right">{currency(it.rate)}</td>
                  <td className="p-2 border text-right">{currency(it.quantity * it.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALS */}
        <div className="max-w-sm ml-auto mt-6 space-y-1 text-right">
          <p>Subtotal: {currency(subtotal)}</p>
          <p>Tax ({taxRate}%): {currency(tax)}</p>
          <p className="font-bold text-lg">Total: {currency(total)}</p>
        </div>
      </div>

      {/* ACTIONS - ONE BUTTON EACH, always visible */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-[800px] mx-auto mt-4">
        <ExportPDF />
        <button
          onClick={() => window.print()}
          className="flex-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
        >
          Print
        </button>
      </div>

    </div>
  );
}

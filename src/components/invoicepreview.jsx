import React, { useRef } from "react";
import { useInvoiceContext } from "../context/InvoiceContext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import ExportPDF from "./exportpdf";

const currency = (n) =>
  (Number(n) || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export default function InvoicePreview() {
  const { clientInfo, invoiceInfo, items, taxRate, subtotal, setItems } =
    useInvoiceContext();
  const ref = useRef();

  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const exportPDF = async () => {
    // Create a hidden clone for PDF-safe rendering
    const clone = ref.current.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.top = "-10000px";
    clone.style.left = "-10000px";
    clone.style.backgroundColor = "#ffffff"; // Force safe background
    clone.querySelectorAll("*").forEach((el) => {
      el.style.color = window.getComputedStyle(el).color;
      el.style.backgroundColor = window.getComputedStyle(el).backgroundColor;
    });

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 0);
    pdf.save(`${invoiceInfo.number || "invoice"}.pdf`);

    document.body.removeChild(clone);
  };

  return (
    <div className="space-y-4">
      <div
        ref={ref}
        className="invoice-preview bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Invoice Preview
        </h2>

        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
          <div className="mb-2 sm:mb-0">
            <p className="font-semibold">From:</p>
            <p>Your Company Name</p>
            <p>123 Main St, City, Country</p>
          </div>
          <div>
            <p className="font-semibold">Bill To:</p>
            <p>{clientInfo.name}</p>
            <p>{clientInfo.address}</p>
          </div>
        </div>

        <table className="w-full border border-gray-300 text-sm table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">Amount</th>
              {/* <th className="p-2 border">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td className="p-2 border">{it.description}</td>
                <td className="p-2 border text-center">{it.quantity}</td>
                <td className="p-2 border text-right">{currency(it.rate)}</td>
                <td className="p-2 border text-right">
                  {currency(it.quantity * it.rate)}
                </td>
                {/* <td className="p-2 border text-center">
                  <button
                    onClick={() =>
                      setItems(items.filter((_, index) => index !== i))
                    }
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4 space-y-1">
          <p>Subtotal: {currency(subtotal)}</p>
          <p>Tax: {currency(tax)}</p>
          <p className="font-bold text-lg">Total: {currency(total)}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-col sm:flex-row max-w-4xl mx-auto">
        {/* <button
          onClick={exportPDF}
          className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Export PDF
        </button> */}
        <div className="text-center">
          <ExportPDF />
        </div>
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

import React, { useRef } from "react";
import { useInvoiceContext } from "../context/InvoiceContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const InvoicePreview = () => {
  const { clientInfo, invoiceInfo, items, taxRate, subtotal } =
    useInvoiceContext();

  const previewRef = useRef();

  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  const printInvoice = () => window.print();

  const exportPDF = async () => {
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
      ignoreElements: (el) => el.style?.color?.includes("oklch"),
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const width = 210;
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div id="invoice-print" ref={previewRef} className="p-6 text-sm bg-white">
        <h1 className="text-2xl font-bold mb-4">Invoice</h1>

        <div className="mb-4">
          <p className="font-semibold">{clientInfo.name}</p>
          <p>{clientInfo.address}</p>
        </div>

        <div className="mb-4">
          <p>
            <strong>Invoice #:</strong> {invoiceInfo.number}
          </p>
          <p>
            <strong>Date:</strong> {invoiceInfo.date}
          </p>
        </div>

        <table className="w-full border-collapse border mb-4">
          <thead>
            <tr>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Rate</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2 text-center">{item.quantity}</td>
                <td className="border p-2 text-right">
                  {item.rate.toFixed(2)}
                </td>
                <td className="border p-2 text-right">
                  {(item.quantity * item.rate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right space-y-1">
          <div>Subtotal: {subtotal.toFixed(2)}</div>
          <div>
            Tax ({taxRate}%): {tax.toFixed(2)}
          </div>
          <div className="font-bold text-lg">Total: {total.toFixed(2)}</div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 no-print">
        <button
          onClick={printInvoice}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Print
        </button>
        <button
          onClick={exportPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePreview;

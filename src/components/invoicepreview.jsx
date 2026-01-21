// src/components/InvoicePreview.jsx
import React, { useRef } from "react";
import { useInvoiceContext } from "../context/InvoiceContext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const currency = (n) =>
  (Number(n) || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export default function InvoicePreview() {
  const { clientInfo,invoiceInfo, items, taxRate, subtotal } = useInvoiceContext();
  const previewRef = useRef(null);

  const tax = +(subtotal * (taxRate / 100)).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  /* ================= PDF EXPORT (A4 SAFE) ================= */
   const exportPDF = async () => {
    const element = previewRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      windowWidth: element.scrollWidth,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("invoice.pdf");
  };

  /* ================= PRINT ================= */
  const printPreview = () => window.print();

  return (
    <div className="bg-white rounded-2xl shadow p-4 md:p-6">
      
      {/* ===== PREVIEW AREA ===== */}
      <div
        ref={previewRef}
        className="mx-auto max-w-[794px] text-sm print:max-w-full"
      >
        <h2 className="text-xl font-bold mb-4">Invoice</h2>

        {/* Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-semibold">From</p>
            <p>Company Name</p>
            <p>Addressn</p>
          </div>
          <div>
            <p className="font-semibold">Bill To</p>
            <p>{clientInfo.name}</p>
            <p>{clientInfo.address}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto print:overflow-visible">
          <table className="w-full border border-collapse text-xs sm:text-sm">
            <thead className="bg-gray-100">
  <tr>
    <th className="border p-2 text-left w-1/2">Description</th>
    <th className="border p-2 text-center w-12">Qty</th>
    <th className="border p-2 text-right w-20">Rate</th>
    <th className="border p-2 text-right w-24">Amount</th>
  </tr>
</thead>

            <tbody>
              {items.map((it, i) => (
                <tr key={i}>                
                  <td className="border p-2 break-words whitespace-normal max-w-[180px]">{it.description || "-"}</td>
                  <td className="border p-2 text-center">{it.quantity}</td>
                  <td className="border p-2 text-right">
                    {currency(it.rate)}
                  </td>
                  <td className="border p-2 text-right">
                    {currency(it.quantity * it.rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-4 text-right space-y-1">
          <p>Subtotal: {currency(subtotal)}</p>
          <p>Tax ({taxRate}%): {currency(tax)}</p>
          <p className="font-bold text-lg">Total: {currency(total)}</p>
        </div>
      </div>

      {/* ===== ACTIONS (NO PRINT) ===== */}
      <div className="no-print flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={exportPDF}
          className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Export PDF
        </button>

        <button
          onClick={printPreview}
          className="flex-1 bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
        >
          Print
        </button>
      </div>
    </div>
  );
}

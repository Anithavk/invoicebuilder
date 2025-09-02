import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useInvoiceContext } from "../context/InvoiceContext";

const ExportPDF = () => {
  const { clientInfo, invoiceInfo, items, subtotal, taxRate } =
    useInvoiceContext();

  const isEmptyItem = (item) =>
    item.description.trim() === "" || item.quantity === 0 || item.rate === 0;

  const handleExport = () => {
    const validItems = items.filter((item) => !isEmptyItem(item));

    if (!clientInfo.name.trim() || !clientInfo.address.trim()) {
      alert("Please fill client information before exporting!");
      return;
    }
    if (!invoiceInfo.number || !invoiceInfo.date) {
      alert("Please fill invoice information before exporting!");
      return;
    }
    if (validItems.length === 0) {
      alert("Please add at least one valid item before exporting!");
      return;
    }

    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    // Client info
    doc.setFontSize(12);
    doc.text(`Client: ${clientInfo?.name}`, 14, 30);
    doc.text(`${clientInfo?.address}`, 14, 36);

    // Invoice info
    doc.text(`Invoice #: ${invoiceInfo?.number}`, 140, 30);
    doc.text(`Date: ${invoiceInfo?.date}`, 140, 36);

    // Items table
    doc.autoTable({
      startY: 50,
      head: [["Description", "Qty", "Rate", "Amount"]],
      body: validItems.map((item) => [
        item.description,
        item.quantity,
        item.rate.toFixed(2),
        (item.quantity * item.rate).toFixed(2),
      ]),
      styles: { halign: "center" },
      headStyles: { fillColor: [37, 99, 235] }, // Tailwind blue-600
    });

    // Totals
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;

    doc.text(`Subtotal: ${subtotal.toFixed(2)}`, pageWidth - margin, finalY, {
      align: "right",
    });
    doc.text(
      `Tax (${(taxRate * 100).toFixed(0)}%): ${tax.toFixed(2)}`,
      pageWidth - margin,
      finalY + 6,
      { align: "right" }
    );
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${total.toFixed(2)}`, pageWidth - margin, finalY + 14, {
      align: "right",
    });

    // Save PDF
    doc.save("invoice.pdf");
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      Export PDF
    </button>
  );
};

export default ExportPDF;

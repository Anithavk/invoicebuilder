import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import { useInvoiceContext } from "../context/InvoiceContext";

const ExportPDF = () => {
  const { clientInfo, invoiceInfo, items, subtotal, taxRate } =
    useInvoiceContext();
  const isEmptyItem = (item) =>
    item.description.trim() === "" || item.quantity === 0 || item.rate === 0;
  const isEmptyClient = (item) =>
    clientInfo.name.trim() === "" || clientInfo.address === "";
  const isEmptyInvoice = (item) =>
    invoiceInfo.number === "" || invoiceInfo.date === "";

  const handleExport = () => {
    const validItems = items.filter((item) => !isEmptyItem(item));
    const hasClient = !isEmptyClient(clientInfo);
    const hasInvoice = !isEmptyInvoice(invoiceInfo);

    console.log(
      "Valid length:",
      validItems.length,
      hasClient,
      hasInvoice,
      invoiceInfo
    );
    if (validItems.length === 0 || hasClient == false || hasInvoice == false) {
      alert("Please fill in all the client ,item and invoce fields before exporting to PDF.");
      return;
    }
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    doc.setFontSize(12);
    doc.text(`Client: ${clientInfo?.name || ""}`, 14, 30);
    doc.text(`${clientInfo?.address || ""}`, 14, 36);

    doc.text(`Invoice #: ${invoiceInfo?.number || ""}`, 140, 30);
    doc.text(`Date: ${invoiceInfo?.date || ""}`, 140, 36);

    doc.autoTable({
      startY: 50,
      head: [["Description", "Qty", "Rate", "Amount"]],
      body: items.map((item) => [
        item.description || "",
        item.quantity || 0,
        item.rate?.toFixed(2) || "0.00",
        ((item.quantity || 0) * (item.rate || 0)).toFixed(2),
      ]),
    });

    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const finalY = doc.lastAutoTable.finalY + 10;

    doc.text(`Subtotal: ${subtotal.toFixed(2)}`, 140, finalY);
    doc.text(`Tax: ${tax.toFixed(2)}`, 140, finalY + 6);
    doc.setFontSize(14);
    doc.text(`Total: ${total.toFixed(2)}`, 140, finalY + 12);

    doc.save("invoice.pdf");
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 text-black px-4 py-2 rounded mt-4"
    >
      Export PDF
    </button>
  );
};
export default ExportPDF;

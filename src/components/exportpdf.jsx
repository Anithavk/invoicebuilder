import html2pdf from "html2pdf.js";

export default function ExportPDF({ invoiceRef }) {
  const exportPDF = () => {
    if (!invoiceRef?.current) return;

    // TEMP FIX: disable modern color parsing
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        color: rgb(0,0,0) !important;
        background-color: transparent !important;
      }
      table, th, td {
        border-color: #000 !important;
      }
    `;
    document.head.appendChild(style);

    html2pdf()
      .from(invoiceRef.current)
      .set({
        margin: 10,
        filename: "invoice.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .save()
      .then(() => document.head.removeChild(style));
  };

  return (
    <button
      onClick={exportPDF}
      className="flex-1 bg-blue-600 text-white py-2 rounded-md"
    >
      Export PDF
    </button>
  );
}

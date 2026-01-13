import html2pdf from "html2pdf.js";

const exportPDF = () => {
  const element = document.getElementById("invoice-pdf");

  if (!element) return;

  html2pdf()
    .set({
      margin: 10,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save();
};

export default function ExportPDF() {
  return (
    <button
      onClick={exportPDF}
      className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Export PDF
    </button>
  );
}

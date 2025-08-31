// src/App.jsx
import React from "react";
import { InvoiceProvider } from "./context/InvoiceContext";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";
import ExportPDF from "./components/exportpdf";

function App() {
  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
          <InvoiceForm />
          <InvoicePreview />
          <ExportPDF />
        </div>
      </div>
    </InvoiceProvider>
  );
}

export default App;

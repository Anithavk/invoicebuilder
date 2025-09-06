import React from "react";
import { InvoiceProvider } from "./context/InvoiceContext";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/invoicepreview";

export default function App() {
  return (
    <InvoiceProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2">
          {/* Left: Form */}
          <div className="bg-white shadow rounded-2xl p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">Invoice Builder</h1>
            <InvoiceForm />
          </div>

          {/* Right: Preview */}
          <div className="bg-white shadow rounded-2xl p-6 overflow-y-auto">
            <InvoicePreview />
          </div>
        </div>
      </div>
    </InvoiceProvider>
  );
}

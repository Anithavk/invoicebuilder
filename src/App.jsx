import React from "react";
import { InvoiceProvider } from "./context/InvoiceContext";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/invoicepreview";
import ExportPDF from "./components/exportpdf";

function App() {
  return (
    <InvoiceProvider>
      <div className="min-h-screen p-4 md:p-6 w-full">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Form */}
          <div className="bg-white rounded-lg shadow flex flex-col h-full p-6">
            <div className="flex-1 overflow-y-auto">
              <InvoiceForm />
            </div>
            {/* <div className="sticky bottom-0 bg-white border-t p-4">
              <ExportPDF />
            </div> */}
          </div>

          {/* Right: Preview */}
          <div className="bg-white rounded-lg shadow flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              <InvoicePreview />
            </div>
          </div>
        </div>
      </div>
    </InvoiceProvider>
  );
}

export default App;

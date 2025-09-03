import React from "react";
import { InvoiceProvider } from "./context/InvoiceContext";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/invoicepreview";
import ExportPDF from "./components/exportpdf";
import InvoiceBuilder from "./components/invoicebuilder";

function App() {
  return (
    <InvoiceProvider>
      <InvoiceBuilder />
    </InvoiceProvider>
  );
}

export default App;

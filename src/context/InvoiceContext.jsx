import React, { createContext, useContext, useEffect, useState } from "react";

const InvoiceContext = createContext();

const STORAGE_KEY = "invoice-data";

export const InvoiceProvider = ({ children }) => {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  const [clientInfo, setClientInfo] = useState(
    savedData.clientInfo || { name: "", address: "" }
  );

  const [invoiceInfo, setInvoiceInfo] = useState(
    savedData.invoiceInfo || { number: "", date: "" }
  );

  const [items, setItems] = useState(
    savedData.items || [{ description: "", quantity: 1, rate: 0 }]
  );

  const [taxRate, setTaxRate] = useState(savedData.taxRate ?? 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );

  /* 🔐 SAVE TO LOCAL STORAGE ON CHANGE */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        clientInfo,
        invoiceInfo,
        items,
        taxRate,
      })
    );
  }, [clientInfo, invoiceInfo, items, taxRate]);

  return (
    <InvoiceContext.Provider
      value={{
        clientInfo,
        setClientInfo,
        invoiceInfo,
        setInvoiceInfo,
        items,
        setItems,
        taxRate,
        setTaxRate,
        subtotal,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => useContext(InvoiceContext);

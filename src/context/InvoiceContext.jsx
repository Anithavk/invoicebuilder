import React, { createContext, useContext, useState, useEffect } from "react";

const InvoiceContext = createContext();
export const useInvoiceContext = () => useContext(InvoiceContext);

export const InvoiceProvider = ({ children }) => {
  const [clientInfo, setClientInfo] = useState({ name: "", address: "" });
  const [invoiceInfo, setInvoiceInfo] = useState({ number: "", date: "" });
  const [items, setItems] = useState([
    { description: "", quantity: 0, rate: 0 },
  ]);
  const [taxRate, setTaxRate] = useState(0.1);

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );

  useEffect(() => {
    const saved = localStorage.getItem("invoiceData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setClientInfo(parsed.clientInfo || { name: "", address: "" });
      setInvoiceInfo(parsed.invoiceInfo || { number: "", date: "" });
      setItems(parsed.items || [{ description: "", quantity: 0, rate: 0 }]);
      setTaxRate(parsed.taxRate ?? 0.1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "invoiceData",
      JSON.stringify({ clientInfo, invoiceInfo, items, taxRate })
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

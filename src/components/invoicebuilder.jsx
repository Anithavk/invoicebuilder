import React, { useEffect, useRef } from "react";
import { useInvoiceContext } from "../context/InvoiceContext";
import exportPDF from "./exportpdf";

const InvoiceBuilder = () => {
  const {
    clientInfo,
    setClientInfo,
    invoiceInfo,
    setInvoiceInfo,
    items,
    setItems,
    subtotal,
    taxRate,
  } = useInvoiceContext();

  const previewRef = useRef();
  useEffect(() => {
    const invoiceNo = `INV-${Date.now()}`;
    setInvoiceInfo((prev) => ({
      ...prev,
      number: invoiceNo,
    }));
  }, [setInvoiceInfo]);

  // ==========================
  // Items handling
  // ==========================
  const handleItemChange = (i, field, value) => {
    const newItems = [...items];
    newItems[i][field] = field === "description" ? value : Number(value) || 0;
    setItems(newItems);
  };

  const addItem = () =>
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const tax = +(subtotal * (taxRate / 100)).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const printPreview = () => window.print();

  // ==========================
  // UI
  // ==========================
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <header className="sticky top-0 z-20 bg-gray-100 shadow-sm p-4 text-center">
        <h1 className="text-xl sm:text-3xl font-bold text-blue-700">
          Invoice Builder
        </h1>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {/* LEFT */}
        <div className="bg-white rounded-2xl shadow p-4 md:p-6 space-y-6">
          {/* Client & Invoice Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold mb-2">Client Information</h2>
              <input
                placeholder="Client Name"
                value={clientInfo.name}
                onChange={(e) =>
                  setClientInfo({ ...clientInfo, name: e.target.value })
                }
                className="w-full p-2 border rounded mb-3"
              />
              <textarea
                placeholder="Client Address"
                value={clientInfo.address}
                onChange={(e) =>
                  setClientInfo({
                    ...clientInfo,
                    address: e.target.value,
                  })
                }
                rows={3}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <h2 className="font-semibold mb-2">Invoice Information</h2>
              <input
                placeholder="Invoice Number"
                value={invoiceInfo.number || ""}
                readOnly
                className="w-full p-2 border rounded mb-3 bg-gray-100"
              />

              <input
                type="date"
                value={invoiceInfo.date || ""}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setInvoiceInfo((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-5 gap-3 p-4 border rounded"
              >
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-600 block">
                    Description
                  </label>
                  <input
                    value={it.description}
                    onChange={(e) =>
                      handleItemChange(idx, "description", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 block">Qty</label>
                  <input
                    type="number"
                    value={it.quantity}
                    onChange={(e) =>
                      handleItemChange(idx, "quantity", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 block">Rate</label>
                  <input
                    type="number"
                    value={it.rate}
                    onChange={(e) =>
                      handleItemChange(idx, "rate", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 block">Amount</label>
                  <div className="p-2 border rounded bg-gray-50">
                    {(it.quantity * it.rate).toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => removeItem(idx)}
                  className="bg-red-500 text-white rounded px-3 py-2 sm:self-end"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            + Add Item
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-2xl shadow p-4 md:p-6 overflow-x-auto">
          <div
            ref={previewRef}
            className="max-w-[794px] mx-auto text-sm bg-white p-4"
          >
            <h2 className="text-xl font-bold mb-4">Invoice Preview</h2>

            <p className="font-semibold">{clientInfo.name}</p>
            <p className="mb-2">{clientInfo.address}</p>
            <p className="mb-2">
              <strong>Invoice #:</strong> {invoiceInfo.number}
            </p>
            <p className="mb-4">
              <strong>Date:</strong> {invoiceInfo.date}
            </p>

            <table className="w-full border mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Rate</th>
                  <th className="border p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i}>
                    <td className="border p-2">{it.description}</td>
                    <td className="border p-2 text-center">{it.quantity}</td>
                    <td className="border p-2 text-right">{it.rate}</td>
                    <td className="border p-2 text-right">
                      {(it.quantity * it.rate).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right space-y-1">
              <div>Subtotal: {subtotal.toFixed(2)}</div>
              <div>
                Tax ({taxRate}%): {tax.toFixed(2)}
              </div>
              <div className="font-bold text-lg">Total: {total.toFixed(2)}</div>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => exportPDF(previewRef.current)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Export PDF
              </button>
              <button
                onClick={printPreview}
                className="bg-gray-800 text-white px-4 py-2 rounded"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvoiceBuilder;

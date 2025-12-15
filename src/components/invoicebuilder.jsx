// src/components/InvoiceBuilder.jsx
import React from "react";
import { useInvoiceContext } from "../context/InvoiceContext";
import ExportPDF from "./exportpdf";

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

  const handleItemChange = (i, field, value) => {
    const newItems = [...items];
    newItems[i][field] = field === "description" ? value : Number(value) || 0;
    setItems(newItems);
  };

  const addItem = () =>
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);

  const removeItem = (i) => setItems(items.filter((_, idx) => idx !== i));

  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Header */}
      <header className="sticky top-0 z-20 bg-gray-100 shadow-sm p-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-700">
          Invoice Builder
        </h1>
      </header>

      {/* MAIN SCROLL AREA */}
      <main className="flex-1">

        <div className="flex flex-col gap-6">

          {/* Client & Invoice Info */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 p-4 border rounded bg-white shadow-sm">
              <h2 className="font-semibold mb-2 text-lg">Client Information</h2>
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
                  setClientInfo({ ...clientInfo, address: e.target.value })
                }
                rows={3}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex-1 p-4 border rounded bg-white shadow-sm">
              <h2 className="font-semibold mb-2 text-lg">Invoice Information</h2>
              <input
                placeholder="Invoice Number"
                value={invoiceInfo.number}
                onChange={(e) =>
                  setInvoiceInfo({ ...invoiceInfo, number: e.target.value })
                }
                className="w-full p-2 border rounded mb-3"
              />
              <input
                type="date"
                value={invoiceInfo.date}
                onChange={(e) =>
                  setInvoiceInfo({ ...invoiceInfo, date: e.target.value })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Items */}
          <div className="w-full overflow-x-auto">
            <div className="flex flex-col gap-4 min-w-0">

              {items.map((it, idx) => (
                <div
                  key={idx}
                  className="flex flex-wrap gap-3 p-4 border rounded bg-white shadow-sm"
                >
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm text-gray-600 mb-1">
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

                  <div className="w-[90px]">
                    <label className="block text-sm text-gray-600 mb-1">Qty</label>
                    <input
                      type="number"
                      value={it.quantity}
                      onChange={(e) =>
                        handleItemChange(idx, "quantity", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="w-[110px]">
                    <label className="block text-sm text-gray-600 mb-1">Rate</label>
                    <input
                      type="number"
                      value={it.rate}
                      onChange={(e) =>
                        handleItemChange(idx, "rate", e.target.value)
                      }
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="w-[110px]">
                    <label className="block text-sm text-gray-600 mb-1">Amount</label>
                    <div className="p-2 border rounded bg-gray-50 font-medium">
                      {(it.quantity * it.rate).toFixed(2)}
                    </div>
                  </div>

                  <div className="flex-1 flex justify-end min-w-[100px] mt-2">
                    <button
                      onClick={() => removeItem(idx)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Item */}
          <div className="text-center">
            <button
              onClick={addItem}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
            >
              Add Item
            </button>
          </div>

        </div>
      </main>

      {/* FIXED FOOTER (SAFE) */}
       <footer className="w-full bg-blue-900 text-white py-4 text-center">
        <div className="flex flex-col items-end gap-1 text-right text-sm sm:text-base">
          <div className="flex justify-end gap-4">
            <span>Subtotal:</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-end gap-4">
            <span>Tax ({(taxRate * 100).toFixed(0)}%):</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-end gap-4 font-bold text-lg">
            <span>Total:</span>
            <span>{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="text-center">
          <ExportPDF />
        </div>
      </footer>

    </div>
  );
};

export default InvoiceBuilder;

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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="sticky top-0 z-10 p-4 bg-gray-50 shadow-sm">
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center w-full">
            Invoice Builder
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto py-6">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          {/* Client & Invoice Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Info */}
            <div className="p-4 border rounded bg-white shadow-sm">
              <h2 className="font-semibold mb-2 text-lg">Client Information</h2>
              <input
                placeholder="Client Name"
                value={clientInfo.name}
                onChange={(e) =>
                  setClientInfo({ ...clientInfo, name: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
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

            {/* Invoice Info */}
            <div className="p-4 border rounded bg-white shadow-sm">
              <h2 className="font-semibold mb-2 text-lg">
                Invoice Information
              </h2>
              <input
                placeholder="Invoice Number"
                value={invoiceInfo.number}
                onChange={(e) =>
                  setInvoiceInfo({ ...invoiceInfo, number: e.target.value })
                }
                className="w-full p-2 border rounded mb-2"
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
          <div className="space-y-4">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="border rounded p-4 bg-white grid grid-cols-1 sm:grid-cols-5 gap-4 items-end shadow-sm"
              >
                <div className="col-span-1 sm:col-span-2">
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

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Qty
                  </label>
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
                  <label className="block text-sm text-gray-600 mb-1">
                    Rate
                  </label>
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
                  <label className="block text-sm text-gray-600 mb-1">
                    Amount
                  </label>
                  <div className="font-medium p-2 border rounded bg-gray-50">
                    {(it.quantity * it.rate).toFixed(2)}
                  </div>
                </div>

                <div className="sm:col-span-5 flex justify-end">
                  <button
                    onClick={() => removeItem(idx)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Item */}
          <div className="text-center">
            <button
              onClick={addItem}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
            >
              Add Item
            </button>
          </div>
        </div>
      </main>

      {/* Footer (Sticky Totals) */}
      <footer className="sticky bottom-0 z-10 bg-gray-100 shadow-inner">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4">
          <div className="text-right space-y-2">
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
        </div>
      </footer>
    </div>
  );
};

export default InvoiceBuilder;

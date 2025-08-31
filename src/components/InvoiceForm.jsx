import React from "react";
import { useInvoiceContext } from "../context/InvoiceContext";
import ExportPDF from "./exportpdf";

const InvoiceForm = () => {
  const {
    clientInfo,
    setClientInfo,
    invoiceInfo,
    setInvoiceInfo,
    items,
    setItems,
    taxRate,
  } = useInvoiceContext();

  const updateItem = (idx, field, value) => {
    const newItems = [...items];
    newItems[idx][field] =
      field === "quantity" || field === "rate" ? Number(value) : value;
    setItems(newItems);
  };

  const addItem = () =>
    setItems([...items, { description: "", quantity: 0, rate: 0 }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-[#f3f4f6] rounded-lg shadow-md">
      {/* Header */}
      <header className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-[#2563eb] mb-2">
          Invoice Builder
        </h1>
      </header>

      {/* Body */}
      <main>
        {/* Client & Invoice Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-1">Client Name</label>
            <input
              type="text"
              value={clientInfo.name}
              onChange={(e) =>
                setClientInfo({ ...clientInfo, name: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
              placeholder="Client Name"
            />
            <label className="block font-semibold mb-1 mt-2">
              Client Address
            </label>
            <input
              type="text"
              value={clientInfo.address}
              onChange={(e) =>
                setClientInfo({ ...clientInfo, address: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
              placeholder="Client Address"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Invoice #</label>
            <input
              type="text"
              value={invoiceInfo.number}
              onChange={(e) =>
                setInvoiceInfo({ ...invoiceInfo, number: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
            <label className="block font-semibold mb-1 mt-2">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoiceInfo.date}
              onChange={(e) =>
                setInvoiceInfo({ ...invoiceInfo, date: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Items Table */}
        <h2 className="text-xl font-bold mb-2 text-[#2563eb]">Items</h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Description</th>
                <th className="border px-2 py-1">Qty</th>
                <th className="border px-2 py-1">Rate</th>
                <th className="border px-2 py-1">Amount</th>
                <th className="border px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(idx, "description", e.target.value)
                      }
                      className="w-full border rounded px-1 py-1"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(idx, "quantity", e.target.value)
                      }
                      className="w-full border rounded px-1 py-1"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateItem(idx, "rate", e.target.value)}
                      className="w-full border rounded px-1 py-1"
                    />
                  </td>
                  <td className="border px-2 py-1 text-right">
                    {(item.quantity * item.rate).toFixed(2)}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    <button
                      onClick={() => removeItem(idx)}
                      className="bg-red-500 text-black px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={addItem}
          className="bg-[#a69d9d] text-black px-4 py-2 rounded mb-4"
        >
          + Add Item
        </button>
      </main>

      {/* Footer / Totals */}
      <footer className="border-t pt-4 flex flex-col md:flex-row justify-end gap-4">
        <div className="space-y-1 text-right">
          <p>
            <strong>Subtotal:</strong> {subtotal.toFixed(2)}
          </p>
          <p>
            <strong>Tax ({(taxRate * 100).toFixed(0)}%):</strong>{" "}
            {tax.toFixed(2)}
          </p>
          <p className="text-lg font-bold">
            <strong>Total:</strong> {total.toFixed(2)}
          </p>
        </div>
        <ExportPDF />
      </footer>
    </div>
  );
};

export default InvoiceForm;

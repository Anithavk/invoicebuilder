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

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] =
      field === "description" ? value : Number(value);
    setItems(updatedItems);
  };

  const addItem = () =>
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);

  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="bg-gray-50 w-full min-h-full p-4">
      <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">
          Invoice Builder
        </h1>

        {/* Client & Invoice Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded shadow-sm bg-white">
            <h2 className="font-semibold mb-2 text-lg">Client Information</h2>
            <input
              type="text"
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
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div className="p-4 border rounded shadow-sm bg-white">
            <h2 className="font-semibold mb-2 text-lg">Invoice Information</h2>
            <input
              type="text"
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
              className="w-full p-2 border rounded mb-2"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="border rounded p-4 bg-white grid grid-cols-1 sm:grid-cols-5 gap-4 items-end"
            >
              <div className="col-span-1 sm:col-span-2">
                <label className="block text-gray-600 text-sm mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(idx, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Qty</label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(idx, "quantity", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">Rate</label>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(idx, "rate", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm mb-1">
                  Amount
                </label>
                <div className="font-medium p-2 border rounded bg-gray-50">
                  {(item.quantity * item.rate).toFixed(2)}
                </div>
              </div>

              <div className="sm:col-span-5 flex justify-end">
                <button
                  onClick={() => removeItem(idx)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition w-full sm:w-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Actions (normal flow, scrolls naturally) */}
        <div className="bg-gray-100 border-t py-4 mt-4 flex flex-col gap-4">
          <div className="text-center">
            <button
              onClick={addItem}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
            >
              Add Item
            </button>
          </div>

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

            <div className="text-center mt-2">
              <ExportPDF />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceBuilder;

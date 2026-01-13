import React from "react";
import { useInvoiceContext } from "../context/InvoiceContext";
import ExportPDF from "./exportpdf";
import InvoicePreview from "./invoicepreview.jsx";

const InvoiceBuilder = () => {
  const {
    clientInfo,
    setClientInfo,
    invoiceInfo,
    setInvoiceInfo,
    items,
    setItems,
    taxRate,
    setTaxRate,
  } = useInvoiceContext();

  const handleItemChange = (i, field, value) => {
    const updated = [...items];
    updated[i][field] =
      field === "description" ? value : Number(value) || 0;
    setItems(updated);
  };
 const clearInvoice = () => {
  localStorage.removeItem("invoice-data");
  window.location.reload();
};

  const addItem = () =>
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);

  const removeItem = (i) =>
    setItems(items.filter((_, idx) => idx !== i));

  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0
  );

  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
     <header className="bg-white shadow p-4 flex justify-between items-center">
  <h1 className="text-2xl font-bold text-blue-700">
    Invoice Builder
  </h1>

  <button
    onClick={clearInvoice}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    New Invoice
  </button>
</header>

      {/* MAIN */}
      <main className="max-w-4xl mx-auto p-4 space-y-6">

        {/* TAX */}
        <div className="bg-white p-4 rounded-xl shadow">
          <label className="block font-medium mb-1">
            Tax Rate (%)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* CLIENT INFO */}
        <div className="bg-white p-4 rounded-xl shadow space-y-4">
          <h2 className="font-semibold text-blue-700">
            Client Information
          </h2>

          <input
            placeholder="Client Name"
            value={clientInfo.name}
            onChange={(e) =>
              setClientInfo({ ...clientInfo, name: e.target.value })
            }
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Client Address"
            value={clientInfo.address}
            onChange={(e) =>
              setClientInfo({ ...clientInfo, address: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        {/* INVOICE INFO */}
        <div className="bg-white p-4 rounded-xl shadow space-y-4">
          <h2 className="font-semibold text-blue-700">
            Invoice Information
          </h2>

          <input
            placeholder="Invoice Number"
            value={invoiceInfo.number}
            onChange={(e) =>
              setInvoiceInfo({ ...invoiceInfo, number: e.target.value })
            }
            className="w-full p-2 border rounded"
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

        {/* ITEMS */}
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-blue-700">
              Items
            </h2>
            <button
              onClick={addItem}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              + Add Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Rate</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td className="border p-1">
                      <input
                        className="w-full border p-1"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(i, "description", e.target.value)
                        }
                      />
                    </td>
                    <td className="border p-1">
                      <input
                        type="number"
                        className="w-full border p-1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(i, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td className="border p-1">
                      <input
                        type="number"
                        className="w-full border p-1"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(i, "rate", e.target.value)
                        }
                      />
                    </td>
                    <td className="border p-2 text-right">
                      {(item.quantity * item.rate).toFixed(2)}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => removeItem(i)}
                        className="text-red-600 text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right space-y-1">
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p className="font-bold text-lg">
              Total: ${total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* INVOICE PREVIEW — FULL WIDTH */}
        <div className="md:col-span-2">
  <InvoicePreview />
</div>
       
      </main>
    </div>
  );
};

export default InvoiceBuilder;

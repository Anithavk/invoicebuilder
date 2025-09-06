import React from "react";
import { useInvoiceContext } from "../context/InvoiceContext";

export default function InvoiceForm() {
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

  const handleItemChange = (i, field, val) => {
    setItems((prev) => {
      const next = [...prev];
      next[i] = {
        ...next[i],
        [field]: field === "description" ? val : Number(val),
      };
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
        Client Info
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Name
          </label>
          <input
            value={clientInfo.name}
            onChange={(e) =>
              setClientInfo({ ...clientInfo, name: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Address
          </label>
          <input
            value={clientInfo.address}
            onChange={(e) =>
              setClientInfo({ ...clientInfo, address: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
        Invoice Info
      </h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Invoice Number
          </label>
          <input
            value={invoiceInfo.number}
            onChange={(e) =>
              setInvoiceInfo({ ...invoiceInfo, number: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Date
          </label>
          <input
            type="date"
            value={invoiceInfo.date}
            onChange={(e) =>
              setInvoiceInfo({ ...invoiceInfo, date: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
        Items
      </h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-5 gap-2 items-center">
            <input
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleItemChange(i, "description", e.target.value)
              }
              className="col-span-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => handleItemChange(i, "quantity", e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
            />
            <input
              type="number"
              placeholder="Rate"
              value={item.rate}
              onChange={(e) => handleItemChange(i, "rate", e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
            />
            <button
              type="button"
              onClick={() => setItems(items.filter((_, index) => index !== i))}
              className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
            >
              -
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setItems([...items, { description: "", quantity: 0, rate: 0 }])
          }
          className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
        >
          + Add Item
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Tax Rate (%)
          </label>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 w-full dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useInvoiceContext } from "../context/InvoiceContext";

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

  const [dateError, setDateError] = useState("");

  /* ===== DATE HELPERS ===== */
  const today = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split("T")[0];
  })();

  const maxDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  })();

  /* ===== AUTO INVOICE NUMBER + DEFAULT DATE ===== */
  useEffect(() => {
    setInvoiceInfo((prev) => ({
      ...prev,
      number: prev.number || `INV-${Date.now()}`,
      date: prev.date || today, // set default only once
    }));
  }, [setInvoiceInfo, today]);

  /* ===== DATE CHANGE HANDLER (HARD BLOCK) ===== */
  const handleDateChange = (value) => {
    if (value < today) {
      setDateError("❌ Past dates are not allowed.");
      return;
    }

    if (value > maxDate) {
      setDateError("❌ Date cannot be more than 30 days ahead.");
      return;
    }

    setDateError("");
    setInvoiceInfo((prev) => ({
      ...prev,
      date: value,
    }));
  };

  /* ===== ITEMS ===== */
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: field === "description" ? value : Number(value) || 0,
    };
    setItems(updated);
  };

  const addItem = () =>
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);

  const removeItem = (index) =>
    setItems(items.filter((_, i) => i !== index));

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      <h2 className="text-xl font-bold">Invoice Builder</h2>

      {/* Client Info */}
      <div>
        <h3 className="font-semibold mb-2">Client Info</h3>

        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Client Name"
          value={clientInfo.name}
          onChange={(e) =>
            setClientInfo({ ...clientInfo, name: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Client Address"
          rows={3}
          value={clientInfo.address}
          onChange={(e) =>
            setClientInfo({ ...clientInfo, address: e.target.value })
          }
        />
      </div>

      {/* Invoice Info */}
      <div>
        <h3 className="font-semibold mb-2">Invoice Info</h3>

        <input
          className="w-full border p-2 rounded bg-gray-100"
          value={invoiceInfo.number}
          readOnly
        />

        <input
          type="date"
          value={invoiceInfo.date}
          min={today}          // ✅ UI BLOCK
          max={maxDate}        // ✅ UI BLOCK
          onChange={(e) => handleDateChange(e.target.value)} // ✅ LOGIC BLOCK
          className="w-full p-2 border rounded"
        />

        {dateError && (
          <p className="text-red-600 text-sm mt-1">{dateError}</p>
        )}
      </div>

      {/* Items */}
      <div>
        <h3 className="font-semibold mb-2">Items</h3>

        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-5 gap-2 mb-2">
            <input
              className="border p-2 rounded col-span-2"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleItemChange(i, "description", e.target.value)
              }
            />
            <input
              type="number"
              className="border p-2 rounded"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(i, "quantity", e.target.value)
              }
            />
            <input
              type="number"
              className="border p-2 rounded"
              value={item.rate}
              onChange={(e) =>
                handleItemChange(i, "rate", e.target.value)
              }
            />
            <button
              onClick={() => removeItem(i)}
              className="bg-red-500 text-white rounded"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addItem}
          className="w-full bg-blue-600 text-white py-2 rounded mt-2"
        >
          + Add Item
        </button>
      </div>

      {/* Tax */}
      <div>
        <label className="font-semibold">Tax Rate (%)</label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={taxRate}
          onChange={(e) => setTaxRate(Number(e.target.value) || 0)}
        />
      </div>
    </div>
  );
};

export default InvoiceBuilder;

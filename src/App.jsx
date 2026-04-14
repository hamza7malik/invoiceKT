import { useState } from "react";
import "./App.css";
import InvoiceSettings from "./components/InvoiceSettings";
import InvoicePreview from "./components/InvoicePreview";

function App() {
  const [invoiceData, setInvoiceData] = useState({
    yourName: "",
    hourlyRate: "",
    clientName: "",
    invoiceNumber: "",
    invoiceDate: "",
    weekStart: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountHolder: "",
    items: [],
  });

  const updateInvoiceData = (newData) => {
    setInvoiceData((prev) => ({ ...prev, ...newData }));
  };

  const addItem = (item) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, item],
    }));
  };

  const updateItem = (index, updatedItem) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? updatedItem : item)),
    }));
  };

  const deleteItem = (index) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const reorderItems = (startIndex, endIndex) => {
    setInvoiceData((prev) => {
      const items = [...prev.items];
      const [removed] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, removed);
      return { ...prev, items };
    });
  };

  const clearItems = () => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [],
    }));
  };

  return (
    <div className="app-container">
      <InvoiceSettings
        data={invoiceData}
        updateData={updateInvoiceData}
        addItem={addItem}
        updateItem={updateItem}
        deleteItem={deleteItem}
        reorderItems={reorderItems}
        clearItems={clearItems}
      />
      <InvoicePreview data={invoiceData} />
    </div>
  );
}

export default App;

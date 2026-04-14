import { useState } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import "./App.css";
import InvoiceSettings from "./components/InvoiceSettings";
import InvoicePDF, {
  PAGE_WIDTH,
  PAGE_HEIGHT,
} from "./templates/professional/InvoicePDF";
import sampleData from "./data/sampleData.json";
import { templates, defaultTemplate } from "./templates";

function App() {
  const [invoiceData, setInvoiceData] = useState(sampleData);
  const [currentTemplate] = useState(defaultTemplate); // Future: allow template selection
  const [currentTheme, setCurrentTheme] = useState(
    templates[currentTemplate].defaultTheme,
  );

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

  const handleDownloadPDF = async () => {
    const blob = await pdf(<InvoicePDF data={invoiceData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const clientName = invoiceData.clientName.replace(/\s+/g, "") || "Client";
    const invoiceNum = invoiceData.invoiceNumber || "draft";
    link.download = `Invoice_${clientName}_${invoiceNum}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
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
      <div className="pdf-preview-container">
        <button className="btn-download" onClick={handleDownloadPDF}>
          Download PDF
        </button>

        <div className="theme-swatches">
          {Object.entries(templates[currentTemplate].themes).map(
            ([key, theme]) => (
              <button
                key={key}
                className={`theme-swatch ${currentTheme === key ? "active" : ""}`}
                style={{ backgroundColor: theme.colors.primary }}
                onClick={() => setCurrentTheme(key)}
                title={theme.name}
              />
            ),
          )}
        </div>

        <div className="pdf-viewer-wrapper">
          <PDFViewer
            showToolbar={false}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          >
            <InvoicePDF
              data={invoiceData}
              theme={templates[currentTemplate].themes[currentTheme]}
            />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import "./App.css";
import InvoiceSettings from "./components/InvoiceSettings";
import { useIsMobile } from "./hooks/useMediaQuery";
import InvoicePDF, {
  PAGE_WIDTH,
  PAGE_HEIGHT,
} from "./templates/professional/InvoicePDF";
import sampleData from "./data/sampleData.json";
import { templates, defaultTemplate } from "./templates";

function App() {
  const isMobile = useIsMobile();
  const [invoiceData, setInvoiceData] = useState(sampleData);
  const [currentTemplate] = useState(defaultTemplate); // Future: allow template selection
  const [currentTheme, setCurrentTheme] = useState(
    templates[currentTemplate].defaultTheme,
  );
  const [customColor, setCustomColor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateInvoiceData = (newData) => {
    setIsLoading(true);
    setInvoiceData((prev) => ({ ...prev, ...newData }));
  };

  const addItem = (item) => {
    setIsLoading(true);
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, item],
    }));
  };

  const updateItem = (index, updatedItem) => {
    setIsLoading(true);
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? updatedItem : item)),
    }));
  };

  const deleteItem = (index) => {
    setIsLoading(true);
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const reorderItems = (startIndex, endIndex) => {
    setIsLoading(true);
    setInvoiceData((prev) => {
      const items = [...prev.items];
      const [removed] = items.splice(startIndex, 1);
      items.splice(endIndex, 0, removed);
      return { ...prev, items };
    });
  };

  const clearItems = () => {
    setIsLoading(true);
    setInvoiceData((prev) => ({
      ...prev,
      items: [],
    }));
  };

  const handleThemeChange = (themeKey) => {
    setIsLoading(true);
    setCurrentTheme(themeKey);
    setCustomColor(null); // Reset custom color when selecting preset
  };

  const handleCustomColorChange = (color) => {
    setIsLoading(true);
    setCustomColor(color);
    setCurrentTheme("custom");
  };

  // Reset loading state after data changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [invoiceData, currentTheme, customColor]);

  // Get the active theme object
  const getActiveTheme = () => {
    if (currentTheme === "custom" && customColor) {
      return {
        name: "Custom",
        colors: {
          primary: customColor,
          secondary: customColor,
          text: "#222222",
          lightText: "#555555",
          border: "#dadada",
          background: "#f0f0f0",
        },
      };
    }
    return templates[currentTemplate].themes[currentTheme];
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
        currentTheme={currentTheme}
        handleThemeChange={handleThemeChange}
        themes={templates[currentTemplate].themes}
        customColor={customColor}
        handleCustomColorChange={handleCustomColorChange}
        isMobile={isMobile}
      />
      <div className="pdf-preview-container">
        {isMobile && (
          <div className="mobile-banner">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span>View on desktop for best experience</span>
          </div>
        )}

        {!isMobile && (
          <button className="btn-download" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        )}

        <div className="pdf-viewer-wrapper">
          {isLoading && (
            <div className="pdf-loading-overlay">
              <div className="pdf-spinner"></div>
            </div>
          )}
          <PDFViewer
            showToolbar={false}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.2s ease-in-out",
            }}
          >
            <InvoicePDF data={invoiceData} theme={getActiveTheme()} />
          </PDFViewer>
        </div>

        {isMobile && (
          <button className="btn-download-mobile" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
}

export default App;

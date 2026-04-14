import { useState } from "react";

export default function InvoiceSettings({
  data,
  updateData,
  addItem,
  updateItem,
  deleteItem,
  reorderItems,
  clearItems,
}) {
  const [ticketInput, setTicketInput] = useState("");
  const [hoursInput, setHoursInput] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    workItems: true,
    payment: true,
  });
  const [draggedIndex, setDraggedIndex] = useState(null);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleInputChange = (field, value) => {
    updateData({ [field]: value });
  };

  const handleAddItem = () => {
    if (!ticketInput.trim()) {
      alert("Please enter a ticket/description");
      return;
    }

    const hours = parseFloat(hoursInput);
    if (!hours || hours <= 0) {
      alert("Please enter valid hours (greater than 0)");
      return;
    }

    addItem({ ticket: ticketInput, hours });
    setTicketInput("");
    setHoursInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      reorderItems(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const handleUpdateItem = (index, field, value) => {
    const item = data.items[index];
    updateItem(index, { ...item, [field]: value });
  };

  return (
    <div className="input-panel">
      <div className="input-container">
        <div className="app-branding">
          <h1>invoiceKT</h1>
        </div>

        <h2 className="settings-heading">Invoice Settings</h2>

        <div className="form-section">
          <h3
            onClick={() => toggleSection("basic")}
            className="collapsible-header"
          >
            <span>Basic Information</span>
            <span
              className={`chevron ${expandedSections.basic ? "expanded" : ""}`}
            >
              ›
            </span>
          </h3>
          {expandedSections.basic && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    value={data.yourName}
                    onChange={(e) =>
                      handleInputChange("yourName", e.target.value)
                    }
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <label>Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={data.hourlyRate}
                    onChange={(e) =>
                      handleInputChange("hourlyRate", e.target.value)
                    }
                    placeholder="Enter hourly rate"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    value={data.clientName}
                    onChange={(e) =>
                      handleInputChange("clientName", e.target.value)
                    }
                    placeholder="Client Name"
                  />
                </div>
                <div className="form-group">
                  <label>Invoice Number</label>
                  <input
                    type="text"
                    value={data.invoiceNumber}
                    onChange={(e) =>
                      handleInputChange("invoiceNumber", e.target.value)
                    }
                    placeholder="INV-001"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Invoice Date</label>
                  <input
                    type="date"
                    value={data.invoiceDate}
                    onChange={(e) =>
                      handleInputChange("invoiceDate", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Billing Period Start</label>
                  <input
                    type="date"
                    value={data.weekStart}
                    onChange={(e) =>
                      handleInputChange("weekStart", e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Billing Period End</label>
                  <input
                    type="date"
                    value={data.weekEnd}
                    onChange={(e) =>
                      handleInputChange("weekEnd", e.target.value)
                    }
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="form-section">
          <h3
            onClick={() => toggleSection("workItems")}
            className="collapsible-header"
          >
            <span>Add Work Items</span>
            <span
              className={`chevron ${expandedSections.workItems ? "expanded" : ""}`}
            >
              ›
            </span>
          </h3>
          {expandedSections.workItems && (
            <>
              <div className="form-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <label>Ticket/Description</label>
                  <input
                    type="text"
                    value={ticketInput}
                    onChange={(e) => setTicketInput(e.target.value)}
                    placeholder="e.g., Project task description"
                  />
                </div>
                <div className="form-group">
                  <label>Hours</label>
                  <input
                    type="number"
                    value={hoursInput}
                    onChange={(e) => setHoursInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <button className="btn-add" onClick={handleAddItem}>
                + Add Item
              </button>

              {/* Items List */}
              {data.items.length > 0 && (
                <div className="items-list">
                  <h4>Work Items ({data.items.length})</h4>
                  {data.items.map((item, index) => (
                    <div
                      key={index}
                      className="item-row"
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="drag-handle" title="Drag to reorder">
                        ⋮⋮
                      </div>
                      <div className="item-content">
                        <input
                          type="text"
                          value={item.ticket}
                          onChange={(e) =>
                            handleUpdateItem(index, "ticket", e.target.value)
                          }
                          className="item-input item-ticket"
                          placeholder="Ticket description"
                        />
                        <input
                          type="number"
                          value={item.hours}
                          onChange={(e) =>
                            handleUpdateItem(
                              index,
                              "hours",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="item-input item-hours"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => deleteItem(index)}
                        title="Delete item"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 5.5C5.77614 5.5 6 5.72386 6 6V12C6 12.2761 5.77614 12.5 5.5 12.5C5.22386 12.5 5 12.2761 5 12V6C5 5.72386 5.22386 5.5 5.5 5.5Z"
                            fill="currentColor"
                          />
                          <path
                            d="M8 5.5C8.27614 5.5 8.5 5.72386 8.5 6V12C8.5 12.2761 8.27614 12.5 8 12.5C7.72386 12.5 7.5 12.2761 7.5 12V6C7.5 5.72386 7.72386 5.5 8 5.5Z"
                            fill="currentColor"
                          />
                          <path
                            d="M11 6C11 5.72386 10.7761 5.5 10.5 5.5C10.2239 5.5 10 5.72386 10 6V12C10 12.2761 10.2239 12.5 10.5 12.5C10.7761 12.5 11 12.2761 11 12V6Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.5 3C14.5 3.27614 14.2761 3.5 14 3.5H13.5V13.5C13.5 14.0304 13.2893 14.5391 12.9142 14.9142C12.5391 15.2893 12.0304 15.5 11.5 15.5H4.5C3.96957 15.5 3.46086 15.2893 3.08579 14.9142C2.71071 14.5391 2.5 14.0304 2.5 13.5V3.5H2C1.72386 3.5 1.5 3.27614 1.5 3C1.5 2.72386 1.72386 2.5 2 2.5H5.5V2C5.5 1.60218 5.65804 1.22064 5.93934 0.93934C6.22064 0.658035 6.60218 0.5 7 0.5H9C9.39782 0.5 9.77936 0.658035 10.0607 0.93934C10.342 1.22064 10.5 1.60218 10.5 2V2.5H14C14.2761 2.5 14.5 2.72386 14.5 3ZM6.5 2.5H9.5V2C9.5 1.86739 9.44732 1.74021 9.35355 1.64645C9.25979 1.55268 9.13261 1.5 9 1.5H7C6.86739 1.5 6.74021 1.55268 6.64645 1.64645C6.55268 1.74021 6.5 1.86739 6.5 2V2.5ZM3.5 3.5V13.5C3.5 13.7652 3.60536 14.0196 3.79289 14.2071C3.98043 14.3946 4.23478 14.5 4.5 14.5H11.5C11.7652 14.5 12.0196 14.3946 12.2071 14.2071C12.3946 14.0196 12.5 13.7652 12.5 13.5V3.5H3.5Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <div className="form-actions">
                    <button className="btn-link" onClick={clearItems}>
                      Clear All Items
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="form-section">
          <h3
            onClick={() => toggleSection("payment")}
            className="collapsible-header"
          >
            <span>Payment Details (Optional)</span>
            <span
              className={`chevron ${expandedSections.payment ? "expanded" : ""}`}
            >
              ›
            </span>
          </h3>
          {expandedSections.payment && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={data.accountHolderName}
                    onChange={(e) =>
                      handleInputChange("accountHolderName", e.target.value)
                    }
                    placeholder="Account Holder Name"
                  />
                </div>
                <div className="form-group">
                  <label>IBAN</label>
                  <input
                    type="text"
                    value={data.iban}
                    onChange={(e) => handleInputChange("iban", e.target.value)}
                    placeholder="IBAN"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Account Number</label>
                  <input
                    type="text"
                    value={data.accountNumber}
                    onChange={(e) =>
                      handleInputChange("accountNumber", e.target.value)
                    }
                    placeholder="Account Number"
                  />
                </div>
                <div className="form-group">
                  <label>SWIFT Code</label>
                  <input
                    type="text"
                    value={data.swiftCode}
                    onChange={(e) =>
                      handleInputChange("swiftCode", e.target.value)
                    }
                    placeholder="SWIFT Code"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Bank Name</label>
                  <input
                    type="text"
                    value={data.bankName}
                    onChange={(e) =>
                      handleInputChange("bankName", e.target.value)
                    }
                    placeholder="Bank Name"
                  />
                </div>
                <div className="form-group">
                  <label>Bank Address</label>
                  <input
                    type="text"
                    value={data.bankAddress}
                    onChange={(e) =>
                      handleInputChange("bankAddress", e.target.value)
                    }
                    placeholder="Bank Address"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import {
  formatDate,
  formatWeekRange,
  formatCurrency,
} from "../utils/formatters";

export default function InvoicePreview({ data }) {
  const hourlyRate = parseFloat(data.hourlyRate) || 0;
  const totalHours = data.items.reduce((sum, item) => sum + item.hours, 0);
  const totalAmount = data.items.reduce(
    (sum, item) => sum + item.hours * hourlyRate,
    0,
  );

  const hasPaymentDetails =
    data.bankName ||
    data.accountNumber ||
    data.routingNumber ||
    data.accountHolder;

  return (
    <div className="page-container">
      <div className="invoice-container">
        {/* Header */}
        <div className="invoice-header">
          <div className="header-title">INVOICE</div>
          <div className="header-name">{data.yourName}</div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Billing + Meta Section */}
        <div className="billing-section">
          <div className="billing-left">
            <div className="section-label">BILLED TO</div>
            <div className="section-value">{data.clientName}</div>
          </div>
          <div className="billing-right">
            <div className="meta-row">
              <span className="meta-label">INVOICE NUMBER</span>
              <span className="meta-value">{data.invoiceNumber}</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">INVOICE DATE</span>
              <span className="meta-value">{formatDate(data.invoiceDate)}</span>
            </div>
            {data.weekStart && data.weekEnd && (
              <div className="meta-row">
                <span className="meta-label">BILLING PERIOD</span>
                <span className="meta-value">
                  {formatWeekRange(data.weekStart, data.weekEnd)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Table Section */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ticket</th>
              <th>Price</th>
              <th>Hours</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={index}>
                <td className="center">{String(index + 1).padStart(2, "0")}</td>
                <td>{item.ticket}</td>
                <td className="center">${hourlyRate}/hr</td>
                <td className="center">{item.hours.toFixed(2)}</td>
                <td className="right">
                  {formatCurrency(item.hours * hourlyRate)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="totals-section">
          <div className="total-row">
            <span className="total-label">TOTAL HOURS</span>
            <span className="total-value">{totalHours.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span className="total-label">TOTAL AMOUNT</span>
            <span className="total-value">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        {/* Payment Details Section */}
        {hasPaymentDetails && (
          <div>
            <div className="divider" style={{ marginTop: "32px" }}></div>
            <div className="payment-section">
              <div className="section-label">PAYMENT DETAILS</div>
              <div className="payment-grid">
                {data.bankName && (
                  <div className="payment-row">
                    <span className="payment-label">Bank Name:</span>
                    <span className="payment-value">{data.bankName}</span>
                  </div>
                )}
                {data.accountNumber && (
                  <div className="payment-row">
                    <span className="payment-label">Account Number:</span>
                    <span className="payment-value">{data.accountNumber}</span>
                  </div>
                )}
                {data.routingNumber && (
                  <div className="payment-row">
                    <span className="payment-label">Routing Number:</span>
                    <span className="payment-value">{data.routingNumber}</span>
                  </div>
                )}
                {data.accountHolder && (
                  <div className="payment-row">
                    <span className="payment-label">Account Holder:</span>
                    <span className="payment-value">{data.accountHolder}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

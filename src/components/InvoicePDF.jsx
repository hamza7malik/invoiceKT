import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register Roboto font
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAw.ttf",
      fontWeight: 500,
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 50,
    fontFamily: "Roboto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1F6F78",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  headerName: {
    fontSize: 14,
    fontWeight: 400,
    color: "#555555",
    marginTop: 4,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    marginVertical: 24,
  },
  billingSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  billingLeft: {
    flex: 1,
  },
  billingRight: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#1F6F78",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  sectionValue: {
    fontSize: 14,
    fontWeight: 400,
    color: "#222222",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#1F6F78",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  metaValue: {
    fontSize: 13,
    fontWeight: 400,
    color: "#222222",
  },
  table: {
    marginTop: 30,
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#DADADA",
    padding: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#DADADA",
    padding: 12,
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: 700,
    color: "#222222",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  tableCell: {
    fontSize: 13,
    fontWeight: 400,
    color: "#222222",
    paddingRight: 8,
  },
  colId: {
    width: "8%",
    textAlign: "center",
  },
  colTicket: {
    width: "45%",
  },
  colPrice: {
    width: "15%",
    textAlign: "center",
  },
  colHours: {
    width: "15%",
    textAlign: "center",
  },
  colTotal: {
    width: "17%",
    textAlign: "right",
  },
  totalsSection: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 24,
  },
  totalRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: "#1F6F78",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  totalValue: {
    fontSize: 15,
    fontWeight: 700,
    color: "#222222",
    minWidth: 100,
    textAlign: "right",
  },
  paymentSection: {
    marginTop: 24,
  },
  paymentGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  paymentRow: {
    flexDirection: "row",
    width: "48%",
    marginBottom: 10,
  },
  paymentLabel: {
    fontSize: 12,
    fontWeight: 700,
    color: "#1F6F78",
    minWidth: 130,
  },
  paymentValue: {
    fontSize: 12,
    fontWeight: 400,
    color: "#222222",
  },
});

export default function InvoicePDF({ data }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  };

  const formatWeekRange = (startDateString) => {
    if (!startDateString) return "";
    const start = new Date(startDateString);
    const end = new Date(start);
    end.setDate(end.getDate() + 6);

    const startMonth = String(start.getMonth() + 1).padStart(2, "0");
    const startDay = String(start.getDate()).padStart(2, "0");
    const endMonth = String(end.getMonth() + 1).padStart(2, "0");
    const endDay = String(end.getDate()).padStart(2, "0");

    return `${startMonth}/${startDay} - ${endMonth}/${endDay}`;
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

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
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.headerTitle}>INVOICE</Text>
            <Text style={styles.headerName}>{data.yourName}</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Billing Section */}
        <View style={styles.billingSection}>
          <View style={styles.billingLeft}>
            <Text style={styles.sectionLabel}>BILLED TO</Text>
            <Text style={styles.sectionValue}>{data.clientName}</Text>
          </View>
          <View style={styles.billingRight}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>INVOICE NUMBER</Text>
              <Text style={styles.metaValue}>{data.invoiceNumber}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>INVOICE DATE</Text>
              <Text style={styles.metaValue}>
                {formatDate(data.invoiceDate)}
              </Text>
            </View>
            {data.weekStart && (
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>BILLING PERIOD</Text>
                <Text style={styles.metaValue}>
                  {formatWeekRange(data.weekStart)}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colId]}>ID</Text>
            <Text style={[styles.tableHeaderCell, styles.colTicket]}>
              Ticket
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colPrice]}>Price</Text>
            <Text style={[styles.tableHeaderCell, styles.colHours]}>Hours</Text>
            <Text style={[styles.tableHeaderCell, styles.colTotal]}>Total</Text>
          </View>

          {/* Table Rows */}
          {data.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.colId]}>
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Text style={[styles.tableCell, styles.colTicket]}>
                {item.ticket}
              </Text>
              <Text style={[styles.tableCell, styles.colPrice]}>
                ${hourlyRate}/hr
              </Text>
              <Text style={[styles.tableCell, styles.colHours]}>
                {item.hours.toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, styles.colTotal]}>
                {formatCurrency(item.hours * hourlyRate)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL HOURS</Text>
            <Text style={styles.totalValue}>{totalHours.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
            <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
          </View>
        </View>

        {/* Payment Details */}
        {hasPaymentDetails && (
          <>
            <View style={[styles.divider, { marginTop: 32 }]} />
            <View style={styles.paymentSection}>
              <Text style={styles.sectionLabel}>PAYMENT DETAILS</Text>
              <View style={styles.paymentGrid}>
                {data.bankName && (
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentLabel}>Bank Name:</Text>
                    <Text style={styles.paymentValue}>{data.bankName}</Text>
                  </View>
                )}
                {data.accountNumber && (
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentLabel}>Account Number:</Text>
                    <Text style={styles.paymentValue}>
                      {data.accountNumber}
                    </Text>
                  </View>
                )}
                {data.routingNumber && (
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentLabel}>Routing Number:</Text>
                    <Text style={styles.paymentValue}>
                      {data.routingNumber}
                    </Text>
                  </View>
                )}
                {data.accountHolder && (
                  <View style={styles.paymentRow}>
                    <Text style={styles.paymentLabel}>Account Holder:</Text>
                    <Text style={styles.paymentValue}>
                      {data.accountHolder}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </>
        )}
      </Page>
    </Document>
  );
}

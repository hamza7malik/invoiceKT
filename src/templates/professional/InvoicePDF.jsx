import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Page dimensions constants (Letter size: 8.5" x 11" at 72 DPI)
export const PAGE_WIDTH = 612;
export const PAGE_HEIGHT = 792;

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

// Dynamic styles based on theme
const createStyles = (theme) =>
  StyleSheet.create({
    page: {
      backgroundColor: theme.colors.background,
      padding: 50,
      fontFamily: "Roboto",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: 700,
      color: theme.colors.primary,
      letterSpacing: 0.5,
      textTransform: "uppercase",
    },
    headerName: {
      fontSize: 11,
      fontWeight: 400,
      color: theme.colors.secondary,
      marginTop: 4,
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
      marginVertical: 16,
    },
    billingSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    billingLeft: {
      flex: 1,
    },
    billingRight: {
      flex: 1,
    },
    sectionLabel: {
      fontSize: 9,
      fontWeight: 700,
      color: theme.colors.primary,
      letterSpacing: 0.5,
      textTransform: "uppercase",
      marginBottom: 12,
    },
    sectionValue: {
      fontSize: 11,
      fontWeight: 400,
      color: "#222222",
    },
    metaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    metaLabel: {
      fontSize: 9,
      fontWeight: 700,
      color: theme.colors.primary,
      letterSpacing: 0.5,
      textTransform: "uppercase",
    },
    metaValue: {
      fontSize: 10,
      fontWeight: 400,
      color: "#222222",
    },
    table: {
      marginTop: 14,
      marginBottom: 14,
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
      fontSize: 9,
      fontWeight: 700,
      color: "#222222",
      textTransform: "uppercase",
      letterSpacing: 0.3,
    },
    tableCell: {
      fontSize: 10,
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
      marginTop: 12,
    },
    totalRow: {
      flexDirection: "row",
      gap: 2,
      marginBottom: 10,
      alignItems: "center",
    },
    totalLabel: {
      fontSize: 10,
      fontWeight: 700,
      color: theme.colors.primary,
      letterSpacing: 0.5,
      textTransform: "uppercase",
      textAlign: "left",
      width: 80,
    },
    totalValue: {
      fontSize: 12,
      fontWeight: 700,
      color: "#222222",
      textAlign: "right",
      width: 100,
    },
    paymentSection: {
      marginTop: "auto",
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: "#DADADA",
    },
    paymentGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 3,
    },
    paymentRow: {
      flexDirection: "row",
      width: "48%",
      marginBottom: 1,
    },
    paymentLabel: {
      fontSize: 8,
      fontWeight: 500,
      color: "#6b7280",
      width: 90,
    },
    paymentValue: {
      fontSize: 8,
      fontWeight: 400,
      color: "#4b5563",
      flex: 1,
    },
  });

export default function InvoicePDF({ data, theme }) {
  // Use default teal theme if none provided
  const currentTheme = theme || {
    name: "Teal",
    colors: {
      primary: "#1F6F78",
      secondary: "#555555",
      text: "#222222",
      textLight: "#6b7280",
      background: "#FFFFFF",
      divider: "#DADADA",
      tableHeader: "#F0F0F0",
    },
  };

  const styles = createStyles(currentTheme);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  };

  const formatWeekRange = (startDateString, endDateString) => {
    if (!startDateString || !endDateString) return "";
    const start = new Date(startDateString);
    const end = new Date(endDateString);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const startMonth = monthNames[start.getMonth()];
    const startDay = start.getDate();
    const endMonth = monthNames[end.getMonth()];
    const endDay = end.getDate();
    const year = end.getFullYear();

    if (start.getMonth() === end.getMonth()) {
      return `${startMonth} ${startDay}–${endDay}, ${year}`;
    }
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${year}`;
  };

  const formatCurrency = (amount) => {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const hourlyRate = parseFloat(data.hourlyRate) || 0;
  const totalHours = data.items.reduce((sum, item) => sum + item.hours, 0);
  const totalAmount = data.items.reduce(
    (sum, item) => sum + item.hours * hourlyRate,
    0,
  );

  const hasPaymentDetails =
    data.accountHolderName ||
    data.iban ||
    data.accountNumber ||
    data.swiftCode ||
    data.bankName ||
    data.bankAddress;

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
            {data.weekStart && data.weekEnd && (
              <View style={styles.metaRow}>
                <Text style={styles.metaLabel}>BILLING PERIOD</Text>
                <Text style={styles.metaValue}>
                  {formatWeekRange(data.weekStart, data.weekEnd)}
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
          <View style={styles.paymentSection}>
            <Text style={styles.sectionLabel}>PAYMENT DETAILS</Text>
            <View style={styles.paymentGrid}>
              {data.accountHolderName && (
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Name:</Text>
                  <Text style={styles.paymentValue}>
                    {data.accountHolderName}
                  </Text>
                </View>
              )}
              {data.iban && (
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>IBAN:</Text>
                  <Text style={styles.paymentValue}>{data.iban}</Text>
                </View>
              )}
              {data.accountNumber && (
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Account Number:</Text>
                  <Text style={styles.paymentValue}>{data.accountNumber}</Text>
                </View>
              )}
              {data.swiftCode && (
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>SWIFT Code:</Text>
                  <Text style={styles.paymentValue}>{data.swiftCode}</Text>
                </View>
              )}
              {data.bankName && (
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Bank Name:</Text>
                  <Text style={styles.paymentValue}>{data.bankName}</Text>
                </View>
              )}
              {data.bankAddress && (
                <View style={styles.paymentRow}>
                  <Text style={styles.paymentLabel}>Bank Address:</Text>
                  <Text style={styles.paymentValue}>{data.bankAddress}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}

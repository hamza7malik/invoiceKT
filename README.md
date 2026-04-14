<img width="1911" height="989" alt="Screenshot 2026-04-15 at 2 07 48 AM 2" src="https://github.com/user-attachments/assets/6975a5e5-2b6a-4745-907e-bcaaf82550f4" />
# Invoice Generator

A professional invoice generator with template-based design and automatic calculations. Generate polished invoices with customizable hourly rates, work items, and payment details.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
src/
├── components/
│   ├── InvoiceSettings.jsx    # Settings panel (left)
│   ├── InvoicePreview.jsx     # Invoice preview (right)
│   └── InvoicePDF.jsx          # PDF generator
├── utils/
│   └── formatters.js          # Formatting utilities
├── App.jsx                     # Main component
├── App.css                     # Styles
└── main.jsx                    # Entry point
```

## ✨ Features

- Set hourly rate and add work items
- Drag & drop to reorder items
- Edit items inline
- Auto-calculate hours and totals
- Optional billing period
- Optional payment details
- Download as PDF
- Responsive side-by-side layout
- Clean, minimal design

## 🛠️ Commands

- `npm install` - Install dependencies
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview build

## 🔧 Tech Stack

- React 18
- Vite
- @react-pdf/renderer

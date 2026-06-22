"use client";
import jsPDF from "jspdf";
import { FiDownload } from "react-icons/fi";

export default function TicketPDFButton({ booking }) {
  const download = () => {
    const doc = new jsPDF();
    const total = booking.totalPrice ?? Number(booking.price || booking.unitPrice || 0) * Number(booking.quantity || 0);

    doc.setFillColor(10, 15, 26);
    doc.rect(0, 0, 210, 34, "F");
    doc.setTextColor(245, 158, 11);
    doc.setFontSize(22);
    doc.text("GoTicket", 14, 16);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text("E-Ticket / Booking Confirmation", 14, 26);

    doc.setTextColor(20, 20, 20);
    doc.setFontSize(14);
    doc.text(booking.ticketTitle || booking.title || "Trip", 14, 50);

    const rows = [
      ["Route", `${booking.from || ""} -> ${booking.to || ""}`],
      ["Transport", booking.transportType || "-"],
      ["Departure", new Date(booking.departureDate).toLocaleString()],
      ["Quantity", String(booking.quantity || 1)],
      ["Amount paid", `BDT ${Number(total).toLocaleString("en-US")}`],
      ["Transaction", booking.transactionId || "-"],
      ["Status", "PAID"],
    ];

    let y = 64;
    doc.setFontSize(11);
    rows.forEach(([k, v]) => {
      doc.setTextColor(120, 120, 120);
      doc.text(k, 14, y);
      doc.setTextColor(20, 20, 20);
      doc.text(String(v), 70, y);
      y += 10;
    });

    doc.setDrawColor(220, 220, 220);
    doc.line(14, y + 2, 196, y + 2);
    doc.setTextColor(120, 120, 120);
    doc.setFontSize(9);
    doc.text("Thank you for booking with GoTicket. Show this ticket at boarding.", 14, y + 12);

    doc.save(`goticket-${booking._id}.pdf`);
  };

  return (
    <button onClick={download} className="btn-outline btn-sm">
      <FiDownload className="h-4 w-4" /> Ticket
    </button>
  );
}
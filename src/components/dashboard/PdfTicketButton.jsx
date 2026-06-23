"use client";
import { jsPDF } from "jspdf";
import { FiDownload } from "react-icons/fi";

export default function PdfTicketButton({ booking }) {
  const download = () => {
    const doc = new jsPDF();
    doc.setFillColor(10, 15, 26);
    doc.rect(0, 0, 210, 38, "F");
    doc.setTextColor(245, 158, 11);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("GoTicket", 14, 22);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("E-Ticket / Payment Receipt", 14, 30);

    doc.setTextColor(20, 26, 40);
    let y = 54;
    const row = (k, v) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${k}`, 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(`${v ?? "—"}`, 80, y);
      y += 11;
    };
    doc.setFontSize(14);
    doc.text(booking.ticketTitle || "Ticket", 14, y);
    y += 12;
    doc.setFontSize(11);
    row("Route", `${booking.from} -> ${booking.to}`);
    row("Transport", booking.transportType);
    row("Departure", new Date(booking.departureDate).toLocaleString());
    row("Quantity", String(booking.quantity));
    row("Amount paid", `BDT ${Number(booking.totalPrice).toFixed(2)}`);
    row("Transaction ID", booking.transactionId || "—");
    row("Passenger", booking.userName || booking.userEmail);
    row("Status", "PAID");

    doc.setDrawColor(220);
    doc.line(14, y + 2, 196, y + 2);
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text("Thank you for booking with GoTicket. Show this ticket at boarding.", 14, y + 12);

    doc.save(`GoTicket-${(booking.ticketTitle || "ticket").replace(/\s+/g, "-")}.pdf`);
  };

  return (
    <button onClick={download} className="btn-outline btn-sm w-full">
      <FiDownload /> Download ticket
    </button>
  );
}

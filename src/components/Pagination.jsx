"use client";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ page, totalPage, onChange }) {
  if (totalPage <= 1) return null;
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button className="btn-outline btn-sm" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
        <FiChevronLeft />
      </button>
      {pages.map((p) => (
        <button key={p} onClick={() => onChange(p)} className={p === page ? "btn-primary btn-sm w-9" : "btn-outline btn-sm w-9"}>
          {p}
        </button>
      ))}
      <button className="btn-outline btn-sm" disabled={page >= totalPage} onClick={() => onChange(page + 1)} aria-label="Next page">
        <FiChevronRight />
      </button>
    </div>
  );
}
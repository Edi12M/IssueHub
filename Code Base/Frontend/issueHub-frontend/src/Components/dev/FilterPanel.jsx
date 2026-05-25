import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { C } from "./DevUI";

// Available labels for filtering
export const AVAILABLE_LABELS = [
  { id: "bug", label: "Bug", color: "#ef4444", bg: "#fef2f2" },
  { id: "feature", label: "Feature", color: "#3b82f6", bg: "#eff6ff" },
  { id: "frontend", label: "Frontend", color: "#8b5cf6", bg: "#f5f3ff" },
  { id: "backend", label: "Backend", color: "#06b6d4", bg: "#ecfdf5" },
  { id: "urgent", label: "Urgent", color: "#f59e0b", bg: "#fffbeb" },
  { id: "docs", label: "Documentation", color: "#10b981", bg: "#f0fdf4" },
  { id: "testing", label: "Testing", color: "#ec4899", bg: "#fdf2f8" },
  { id: "performance", label: "Performance", color: "#6366f1", bg: "#eef2ff" },
];

export function FilterPanel({ onFilterChange, selectedLabels = [], dateRange = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempLabels, setTempLabels] = useState(selectedLabels);
  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const handleLabelToggle = (labelId) => {
    setTempLabels((prev) =>
      prev.includes(labelId)
        ? prev.filter((id) => id !== labelId)
        : [...prev, labelId]
    );
  };

  const handleDateChange = (field, value) => {
    setTempDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    onFilterChange({
      labels: tempLabels,
      dateRange: tempDateRange,
    });
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setTempLabels([]);
    setTempDateRange({});
    onFilterChange({
      labels: [],
      dateRange: {},
    });
    setIsOpen(false);
  };

  const activeFilterCount = tempLabels.length + (tempDateRange.from || tempDateRange.to ? 1 : 0);

  return (
    <div style={{ position: "relative", marginBottom: 20 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          background: isOpen ? C.accent : C.surface,
          border: `1px solid ${isOpen ? C.accent : C.border}`,
          borderRadius: 8,
          color: isOpen ? "#fff" : C.text,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
          transition: "all .2s",
        }}
      >
        🔍 Filters
        {activeFilterCount > 0 && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 24,
              height: 24,
              borderRadius: "50%",
              background: isOpen ? "rgba(255,255,255,.3)" : C.accent,
              color: isOpen ? "#fff" : C.bg,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {activeFilterCount}
          </span>
        )}
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .2s",
            marginLeft: "auto",
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 8,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 20,
            minWidth: 320,
            boxShadow: "0 10px 40px rgba(0,0,0,.3)",
            zIndex: 1000,
          }}
        >
          {/* Labels Section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 10, letterSpacing: 0.5 }}>
              Labels
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {AVAILABLE_LABELS.map((labelMeta) => (
                <button
                  key={labelMeta.id}
                  onClick={() => handleLabelToggle(labelMeta.id)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    background: tempLabels.includes(labelMeta.id) ? labelMeta.color : C.border,
                    color: tempLabels.includes(labelMeta.id) ? "#fff" : C.text,
                    border: "none",
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!tempLabels.includes(labelMeta.id)) {
                      e.target.style.background = C.muted;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!tempLabels.includes(labelMeta.id)) {
                      e.target.style.background = C.border;
                    }
                  }}
                >
                  {tempLabels.includes(labelMeta.id) && (
                    <span style={{ fontSize: 14 }}>✓</span>
                  )}
                  {labelMeta.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Section */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", marginBottom: 10, letterSpacing: 0.5 }}>
              Date Range
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4 }}>
                  From:
                </label>
                <input
                  type="date"
                  value={tempDateRange.from || ""}
                  onChange={(e) => handleDateChange("from", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                    borderRadius: 6,
                    color: C.text,
                    fontSize: 12,
                    fontFamily: "'DM Sans','Segoe UI',sans-serif",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4 }}>
                  To:
                </label>
                <input
                  type="date"
                  value={tempDateRange.to || ""}
                  onChange={(e) => handleDateChange("to", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                    borderRadius: 6,
                    color: C.text,
                    fontSize: 12,
                    fontFamily: "'DM Sans','Segoe UI',sans-serif",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={handleApplyFilters}
              style={{
                flex: 1,
                padding: "10px 16px",
                background: C.accent,
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "opacity .15s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Apply Filters
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  background: C.border,
                  color: C.text,
                  border: "none",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "opacity .15s",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      )}

      {/* Active filters display */}
      {activeFilterCount > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {tempLabels.map((labelId) => {
            const labelMeta = AVAILABLE_LABELS.find((l) => l.id === labelId);
            return (
              <div
                key={labelId}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  background: labelMeta.bg,
                  color: labelMeta.color,
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {labelMeta.label}
                <button
                  onClick={() => handleLabelToggle(labelId)}
                  style={{
                    background: "none",
                    border: "none",
                    color: labelMeta.color,
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
          {(tempDateRange.from || tempDateRange.to) && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 10px",
                background: "#eef2ff",
                color: "#6366f1",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              📅 {tempDateRange.from && tempDateRange.to
                ? `${tempDateRange.from} to ${tempDateRange.to}`
                : tempDateRange.from
                ? `From ${tempDateRange.from}`
                : `Until ${tempDateRange.to}`}
              <button
                onClick={() => {
                  setTempDateRange({});
                  onFilterChange({
                    labels: tempLabels,
                    dateRange: {},
                  });
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6366f1",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

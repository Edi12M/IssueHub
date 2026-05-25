import { Search, X } from "lucide-react";
import { C } from "./DevUI";

export function SearchBar({ placeholder = "Search issues...", onSearch, value = "" }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: C.muted,
        }}
      >
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 400,
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "10px 16px 10px 44px",
          color: C.text,
          fontSize: 14,
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
          outline: "none",
          transition: "border-color .2s, box-shadow .2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = C.accent;
          e.target.style.boxShadow = `0 0 0 2px rgba(124, 140, 248, 0.1)`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = C.border;
          e.target.style.boxShadow = "none";
        }}
      />
      {value && (
        <button
          onClick={() => onSearch("")}
          style={{
            position: "absolute",
            right: 12,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.muted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            transition: "color .15s",
          }}
          onMouseEnter={(e) => (e.target.style.color = C.text)}
          onMouseLeave={(e) => (e.target.style.color = C.muted)}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

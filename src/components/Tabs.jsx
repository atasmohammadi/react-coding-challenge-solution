import { useEffect, useId, useState } from "react";

export default function Tabs({ tabs = [], value, onChange }) {
  const [internal, setInternal] = useState(value ?? tabs[0]?.id);
  const active = value ?? internal;
  const baseId = useId();

  useEffect(() => {
    if (value !== undefined) setInternal(value);
  }, [value]);

  const setActive = (id) => {
    onChange?.(id);
    if (value === undefined) setInternal(id);
  };

  const onKeyDown = (e) => {
    const idx = tabs.findIndex((t) => t.id === active);
    if (idx === -1) return;
    if (e.key === "ArrowRight") setActive(tabs[(idx + 1) % tabs.length].id);
    if (e.key === "ArrowLeft")
      setActive(tabs[(idx - 1 + tabs.length) % tabs.length].id);
    if (e.key === "Home") setActive(tabs[0].id);
    if (e.key === "End") setActive(tabs[tabs.length - 1].id);
  };

  return (
    <div className="tabs">
      <div
        className="tablist"
        role="tablist"
        aria-label="Billing period"
        onKeyDown={onKeyDown}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            aria-controls={`${baseId}-panel-${t.id}`}
            id={`${baseId}-tab-${t.id}`}
            className={`tab ${active === t.id ? "is-active" : ""}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${baseId}-panel-${t.id}`}
          aria-labelledby={`${baseId}-tab-${t.id}`}
          hidden={active !== t.id}
          className="tabpanel"
        />
      ))}
    </div>
  );
}

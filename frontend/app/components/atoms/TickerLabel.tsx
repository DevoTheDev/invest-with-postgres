// components/TickerLabel.tsx
"use client";
import React from "react";
import { Ticker } from "@/app/types/Investor";

export interface TickerLabelStyles {
  container?: string;
  header?: string;
  subheader?: string;
  meta?: string;
  tag?: string;
  figi?: string;
  date?: string;
  badgeActive?: string;
  badgeInactive?: string;
}

interface TickerLabelProps {
  ticker: Partial<Ticker>;
  styles?: TickerLabelStyles;
  highlight?: (text?: string) => React.ReactNode;
  detailed?: boolean;
}

const defaultStyles: TickerLabelStyles = {
  container: "p-4 rounded-xl shadow bg-white text-gray-800 space-y-2",
  header: "text-lg font-bold",
  subheader: "text-sm text-gray-600",
  meta: "text-sm text-gray-700",
  tag: "inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-1",
  figi: "text-xs text-gray-400 break-all space-y-0.5",
  date: "text-xs text-gray-500",
  badgeActive: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded",
  badgeInactive: "text-xs bg-red-100 text-red-700 px-2 py-1 rounded",
};

const TickerLabel: React.FC<TickerLabelProps> = ({
  ticker,
  styles = {},
  highlight,
  detailed = false,
}) => {
  const s = { ...defaultStyles, ...styles };
  const h = (field: string | undefined) => (highlight ? highlight(field) : field);

  return (
    <div className={s.container}>
      {/* Top Row: Ticker + Status */}
      <div className="flex justify-between items-start">
        <div>
          <div className={s.header}>
            {h(ticker.ticker)} — {h(ticker.name) || "Unnamed"}
          </div>
          <div className={s.subheader}>
            {h(ticker.primary_exchange) ?? "Unknown Exchange"}
          </div>
        </div>
        <div className={ticker.active ? s.badgeActive : s.badgeInactive}>
          {ticker.active ? "Active" : "Inactive"}
        </div>
      </div>

      {/* Tags */}
      <div className={s.meta}>
        {[ticker.market, ticker.locale, ticker.currency_name]
          .filter(Boolean)
          .map((v, i) => (
            <span key={i} className={s.tag}>
              {h(v?.toUpperCase())}
            </span>
          ))}
      </div>

      {/* Optional Details */}
      {detailed && (
        <>
          <div className={s.figi}>
            <div>Composite FIGI: {h(ticker.composite_figi) ?? "N/A"}</div>
            <div>Share Class FIGI: {h(ticker.share_class_figi) ?? "N/A"}</div>
            <div>CIK: {h(ticker.cik) ?? "N/A"}</div>
          </div>
          {ticker.last_updated_utc && (
            <div className={s.date}>
              Last updated:{" "}
              {new Date(ticker.last_updated_utc).toLocaleDateString()}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TickerLabel;

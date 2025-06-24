"use client";
import React, { useState, useMemo } from "react";
import Modal from "../atoms/Modal";
import TickerLabel from "../atoms/TickerLabel";
import { Ticker } from "@/app/types/Investor";

interface TickerSearchProps {
  tickers: Partial<Ticker>[];
  styles?: TickerSearchStyles;
}

interface TickerSearchStyles {
  container?: string;
  input?: string;
  list?: string;
  item?: string;
  highlight?: string;
  noResults?: string;
}

const defaultStyles: TickerSearchStyles = {
  container: "w-full max-w-3xl mx-auto p-4 space-y-4",
  input:
    "w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500",
  list: "space-y-2",
  item:
    "p-2 bg-white rounded-xl shadow hover:bg-gray-50 transition cursor-pointer",
  highlight: "bg-yellow-200 px-1 rounded",
  noResults: "text-center text-gray-400",
};

const highlightQuery = (
  text: string | undefined,
  query: string,
  highlightClass: string
) => {
  if (!text || !query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className={highlightClass}>
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const TickerSearch: React.FC<TickerSearchProps> = ({ tickers, styles = {} }) => {
  const [query, setQuery] = useState("");
  const [selection, setSelection] = useState<Partial<Ticker> | null>(null);
  const mergedStyles = { ...defaultStyles, ...styles };

  const filteredTickers = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    const seen = new Set<string>();

    return tickers
      .filter((t) =>
        Object.values(t).some((val) =>
          String(val ?? "")
            .toLowerCase()
            .includes(lowerQuery)
        )
      )
      .filter((t) => {
        const key = t.ticker ?? JSON.stringify(t);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, [query, tickers]);

  return (
    <>
      <Modal
        isOpen={Boolean(selection)}
        onClose={() => setSelection(null)}
        styles={{ closeButton: "bg-red-400 rounded-full" }}
      >
        Beans
      </Modal>

      <div className={mergedStyles.container}>
        <input
          type="text"
          placeholder="Search tickers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={mergedStyles.input}
        />
        <ul className={mergedStyles.list}>
          {filteredTickers.map((ticker, idx) => (
            <li
              key={ticker.ticker ?? `item-${idx}`}
              className={mergedStyles.item}
              onClick={() => setSelection(ticker)}
            >
              <TickerLabel
                ticker={ticker}
                highlight={(field) =>
                  highlightQuery(field, query, mergedStyles.highlight!)
                }
              />
            </li>
          ))}
          {filteredTickers.length === 0 && (
            <li className={mergedStyles.noResults}>No results found.</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default TickerSearch;

"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInvestor } from "@/app/hooks/useInvestor";
import { InvestmentDTO } from "@/app/controllers/InvestmentController";
import { formatHeader } from "@/app/utils/stringUtils";
import { HookForm } from "../organisms/HookForm";
import { Investment } from "@/app/contexts/MarketContext";
import { Ticker } from "@/app/types/Investor";

type Props = {
  ticker: Partial<Ticker>;
};

export default function InvestmentForm({ ticker }: Props) {
  const tickerSymbol = ticker?.ticker || "";

  const {
    investor,
    addInvestment,
    updateInvestmentById,
  } = useInvestor();

  const existing = investor?.investments?.find(
    (inv: Investment) => inv.ticker.toLowerCase() === tickerSymbol.toLowerCase()
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InvestmentDTO>({
    defaultValues: {
      ticker: tickerSymbol,
      quantity: existing?.quantity ?? 0,
      purchase_price: existing?.purchase_price ?? 0,
      purchase_date: existing?.purchase_date
        ? new Date(existing.purchase_date)
        : new Date(),
    },
  });

  useEffect(() => {
    reset({
      ticker: tickerSymbol,
      quantity: existing?.quantity ?? 0,
      purchase_price: existing?.purchase_price ?? 0,
      purchase_date: existing?.purchase_date
        ? new Date(existing.purchase_date)
        : new Date(),
    });
  }, [existing, tickerSymbol, reset]);

  const onSubmit = async (data: InvestmentDTO) => {
    data.ticker = tickerSymbol;

    console.log(data)
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 bg-white shadow-lg p-6 rounded-2xl max-w-lg"
    >
      <h2 className="text-xl font-bold text-gray-800">
        {existing ? "Update Investment" : "Add Investment"} — {formatHeader(tickerSymbol)}
      </h2>

      <HookForm.InputField
        id="quantity"
        label="Quantity"
        type="number"
        register={register("quantity", {
          required: "Quantity is required",
          min: { value: 0, message: "Quantity must be non-negative" },
        })}
        error={errors.quantity}
        placeholder="Enter number of shares"
      />

      <HookForm.InputField
        id="purchase_price"
        label="Purchase Price ($)"
        type="number"
        register={register("purchase_price", {
          required: "Price is required",
          min: { value: 0, message: "Price must be non-negative" },
        })}
        error={errors.purchase_price}
        placeholder="Enter price per share"
      />

      <HookForm.InputField
        id="purchase_date"
        label="Purchase Date"
        type="date"
        register={register("purchase_date", {
          required: "Date is required",
        })}
        error={errors.purchase_date}
      />

      <button type="submit" className="bg-red-400">
        {existing ? "Update Investment" : "Add Investment"}
      </button>
    </form>
  );
}

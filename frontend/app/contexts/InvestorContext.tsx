"use client";
import React, { createContext, useState, useCallback, useContext, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import InvestorController from "../controllers/InvestorController";
import { FieldError, useForm } from "react-hook-form";
import { SaveIcon } from "lucide-react";
import CustomSubmit from "../components/molecules/CustomSubmit";
import { HookForm } from "../components/organisms/HookForm";
import { formatHeader } from "../utils/stringUtils";
import { Investment } from "./MarketContext";
import {
  useAddInvestment,
  useDeleteInvestment,
  useGetInvestments,
  useUpdateInvestment,
  InvestmentDTO,
} from "../controllers/InvestmentController";


export enum InvestmentGoal {
  LONG_TERM_GROWTH = "long_term_growth",
  INCOME = "income",
  CAPITAL_PRESERVATION = "capital_preservation",
  SPECULATION = "speculation",
}

export enum RiskTolerance {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum ExperienceLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  EXPERIENCED = "experienced",
}

// This mirrors your backend entity exactly
export interface Investor {
  id: string;
  user_id: string;
  profile_id: string;

  investment_goal: InvestmentGoal;
  risk_tolerance: RiskTolerance;
  experience_level: ExperienceLevel;
  annual_investment_budget: number;
  auto_invest_enabled: boolean;
  investments: Investment[];
  created_at: string;
  updated_at: string;
}


type InvestorContextType = {
  investor: Investor | null;
  fetchLoading: boolean;
  updateLoading: boolean;
  error: string | null;
  fetchInvestor: () => Promise<void>;
  updateInvestor: (data: Investor) => Promise<void>;
  form: (isOpen: boolean) => React.ReactNode;
  addInvestment: (input: InvestmentDTO) => Promise<void>;
  updateInvestmentById: (id: string, input: InvestmentDTO) => Promise<void>;
  deleteInvestmentById: (id: string) => Promise<void>;


};

export const InvestorContext = createContext<InvestorContextType>({
  investor: null,
  fetchLoading: true,
  updateLoading: false,
  error: null,
  fetchInvestor: async () => { },
  updateInvestor: async () => { },
  form: (isOpen: boolean) => <></>,
  addInvestment: async () => { },
  updateInvestmentById: async () => { },
  deleteInvestmentById: async () => { },
});

export const InvestorProvider = ({ children }: { children: React.ReactNode }) => {
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { getInvestor, updateInvestor: updateInvestorApi } = InvestorController();
  const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm<Investor>({
    defaultValues: {
      investment_goal: investor?.investment_goal || InvestmentGoal.INCOME,
      risk_tolerance: investor?.risk_tolerance || RiskTolerance.LOW,
      experience_level: investor?.experience_level || ExperienceLevel.BEGINNER,
      annual_investment_budget: investor?.annual_investment_budget || 0,
      auto_invest_enabled: investor?.auto_invest_enabled || false,
    },
  });
  // React Query implementation
  const { mutateAsync: addInvestmentMutate } = useAddInvestment();
  const { mutateAsync: updateInvestmentMutate } = useUpdateInvestment();
  const { mutateAsync: deleteInvestmentMutate } = useDeleteInvestment();


  // Fetch investor from API and update state
  const fetchInvestor = useCallback(async (): Promise<void> => {
    try {
      const response = await getInvestor();
      const investorData = response.data.data.investor;
      setInvestor(investorData);
    } catch (err) {
      console.error("🔴 Failed to fetch investor:", err);
      setError((err as Error).message);
      setInvestor(null);
    } finally {
      setFetchLoading(false);
    }
  }, [getInvestor]);

  useEffect(() => {
    if (user) {
      fetchInvestor();
    } else {
      setInvestor(null);
      setFetchLoading(false);
    }
  }, [user, fetchInvestor]);


  // Update investor in API and update state
  const updateInvestor = useCallback(async (data: Investor): Promise<void> => {
    setUpdateLoading(true);
    setError(null);
    try {
      const response = await updateInvestorApi(data);
      const updatedInvestor = response.data.data.updatedInvestor;
      setInvestor(updatedInvestor);
    } catch (err) {
      console.error("🔴 Failed to update investor:", err);
      setError((err as Error).message);
    } finally {
      setUpdateLoading(false);
    }
  }, [updateInvestorApi]);

  // Add Investment
const addInvestment = useCallback(
  async (input: InvestmentDTO) => {
    try {
      const newInvestment = await addInvestmentMutate(input);
      console.log("🟢 Investment added:", newInvestment);
      await fetchInvestor(); // Sync investor state
    } catch (err) {
      console.error("🔴 Failed to add investment:", err);
      setError((err as Error).message);
    }
  },
  [addInvestmentMutate, fetchInvestor]
);

// Update Investment
const updateInvestmentById = useCallback(
  async (id: string, input: InvestmentDTO) => {
    try {
      const updatedInvestment = await updateInvestmentMutate({ investmentId: id, updates: input });
      console.log("🟢 Investment updated:", updatedInvestment);
      await fetchInvestor();
    } catch (err) {
      console.error("🔴 Failed to update investment:", err);
      setError((err as Error).message);
    }
  },
  [updateInvestmentMutate, fetchInvestor]
);

// Delete Investment
const deleteInvestmentById = useCallback(
  async (id: string) => {
    try {
      const remainingInvestments = await deleteInvestmentMutate(id);
      console.log("🟢 Investment deleted. Remaining:", remainingInvestments);
      await fetchInvestor();
    } catch (err) {
      console.error("🔴 Failed to delete investment:", err);
      setError((err as Error).message);
    }
  },
  [deleteInvestmentMutate, fetchInvestor]
);

  // Update form defaults when investor data changes
  useEffect(() => {
    if (investor) reset(investor);
  }, [investor, reset]);

  const form = (isOpen: boolean) => {
    const onSubmit = async (data: Investor) => await updateInvestor(data);
    if (fetchLoading) return <p className="text-center text-gray-600">Loading investor profile...</p>;
    if (error) return <p className="text-red-600 font-medium">Error: {error}</p>;

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-8 bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto"
      >
        <HookForm.LoadingOrError loading={fetchLoading} error={error!} />
        <HookForm.Section title="Investor Preferences">
          <HookForm.SelectField
            label="Investment Goal"
            id="investment_goal"
            register={register("investment_goal", { required: "Investment goal is required" })}
            options={Object.values(InvestmentGoal)}
            placeholder={investor?.investment_goal ? formatHeader(investor.investment_goal) : "Select Goal"}
            error={errors.investment_goal}
          />
          <HookForm.SelectField
            label="Risk Tolerance"
            id="risk_tolerance"
            register={register("risk_tolerance", { required: "Risk tolerance is required" })}
            options={Object.values(RiskTolerance)}
            placeholder={investor?.risk_tolerance ? formatHeader(investor.risk_tolerance) : "Select Risk Tolerance"}
            error={errors.risk_tolerance}
          />
          <HookForm.SelectField
            label="Experience Level"
            id="experience_level"
            register={register("experience_level", { required: "Experience level is required" })}
            options={Object.values(ExperienceLevel)}
            placeholder={investor?.experience_level ? formatHeader(investor.experience_level) : "Select Experience Level"}
            error={errors.experience_level}
          />
        </HookForm.Section>
        <HookForm.Section title="Investment Settings">
          <HookForm.InputField
            label="Annual Investment Budget ($)"
            id="annual_investment_budget"
            type="number"
            register={register("annual_investment_budget", {
              required: "Budget is required",
              min: { value: 0, message: "Budget cannot be negative" },
            })}
            placeholder="Enter your budget"
            error={errors.annual_investment_budget}
          />
          <HookForm.CheckBoxField
            label="Enable Auto-Invest"
            id="auto_invest_enabled"
            register={register("auto_invest_enabled")}
          />
        </HookForm.Section>
        <HookForm.DateInfo created={investor?.created_at} updated={investor?.updated_at} />
        <HookForm.SubmitButton />
      </form>
    );
  };


  return (
    <InvestorContext.Provider value={{
      investor,
      fetchLoading,
      updateLoading,
      error,
      fetchInvestor,
      updateInvestor,
      form,
      addInvestment,
      updateInvestmentById,
      deleteInvestmentById,

    }}>
      {children}
    </InvestorContext.Provider>
  );
};

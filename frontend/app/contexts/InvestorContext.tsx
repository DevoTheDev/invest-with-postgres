"use client";
import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { useAuth } from "../hooks/useAuth";
import InvestorController from "../controllers/InvestorController";
import axios from "axios";
import { ExperienceLevel, InvestmentGoal, Investor, RiskTolerance, Stock } from "../types/Investor";
import { InvestmentDTO } from "../controllers/InvestmentController";
import { FieldError, useForm } from "react-hook-form";
import { HookForm } from "../components/organisms/HookForm";
import { formatHeader } from "../utils/stringUtils";

type InvestorContextType = {
  investor: Investor | null;
  investing: boolean;
  setInvesting: React.Dispatch<React.SetStateAction<boolean>>;
  fetchLoading: boolean;
  updateLoading: boolean;
  selection: Partial<Stock> | null;
  error: string | null;
  fetchInvestor: () => Promise<void>;
  updateInvestor: (data: Investor) => Promise<void>;
  addInvestment: (input: InvestmentDTO) => Promise<void>;
  updateInvestmentById: (id: string, input: InvestmentDTO) => Promise<void>;
  deleteInvestmentById: (id: string) => Promise<void>;
  form: () => React.JSX.Element
  makeSelection: (item: Partial<Stock>) => void;
  clearSelection: () => void;
  invested: (stock: Partial<Stock>) => boolean;
};

export const InvestorContext = createContext<InvestorContextType>({
  investor: null,
  investing: false,
  setInvesting: () => {},
  fetchLoading: true,
  updateLoading: false,
  selection: null,
  error: null,
  fetchInvestor: async () => { },
  updateInvestor: async () => { },
  addInvestment: async () => { },
  updateInvestmentById: async () => { },
  deleteInvestmentById: async () => { },
  form: () => (<div>Investor Form</div>),
  makeSelection: () => { },
  clearSelection: () => { },
  invested: () => false,
});

export const InvestorProvider = ({ children }: { children: React.ReactNode }) => {
  const [investor, setInvestor] = useState<Investor | null>(null);
  const [investing, setInvesting] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selection, setSelection] = useState<Partial<Stock> | null>(null);
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
  const fetchInvestor = useCallback(async () => {
    setFetchLoading(true);
    setError(null);
    try {
      const response = await getInvestor();
      const investorData = response.data.data.investor;
      setInvestor(investorData);
    } catch (err) {
      console.error("🔴 Fetch investor failed", err);
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

  const updateInvestor = useCallback(
    async (data: Investor) => {
      setUpdateLoading(true);
      setError(null);
      try {
        const response = await updateInvestorApi(data);
        const updatedInvestor = response.data.data.updatedInvestor;
        setInvestor(updatedInvestor);
      } catch (err) {
        console.error("🔴 Update investor failed", err);
        setError((err as Error).message);
      } finally {
        setUpdateLoading(false);
      }
    },
    [updateInvestorApi]
  );

  const addInvestment = useCallback(async (input: InvestmentDTO) => {
    try {
      const res = await axios.post(`/investments`, input, { withCredentials: true });
      console.log("🟢 Added investment:", res.data.data.investment);
      await fetchInvestor();
    } catch (err) {
      console.error("🔴 Add investment failed:", err);
      setError((err as Error).message);
    }
  }, [fetchInvestor]);

  const updateInvestmentById = useCallback(async (id: string, input: InvestmentDTO) => {
    try {
      const res = await axios.put(`/investments/${id}`, input, { withCredentials: true });
      console.log("🟢 Updated investment:", res.data.data.investment);
      await fetchInvestor();
    } catch (err) {
      console.error("🔴 Update investment failed:", err);
      setError((err as Error).message);
    }
  }, [fetchInvestor]);

  const deleteInvestmentById = useCallback(async (id: string) => {
    try {
      const res = await axios.delete(`/investments/${id}`, { withCredentials: true });
      console.log("🟢 Deleted investment, remaining:", res.data.data.investments);
      await fetchInvestor();
    } catch (err) {
      console.error("🔴 Delete investment failed:", err);
      setError((err as Error).message);
    }
  }, [fetchInvestor]);

  const form = () => {
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
              max: {
                value: 2_147_483_647,
                message: "Budget exceeds the maximum allowed value",
              },
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

  const makeSelection = (item: Partial<Stock>) => {
    setSelection(item);
  };

  const clearSelection = () => {
    setSelection(null);
    setInvesting(false);
  };

  const invested = (stock: Partial<Stock>) => {
    return !!investor?.investments?.some((inv) => inv.ticker === stock.ticker);
  };

  return (
    <InvestorContext.Provider
      value={{
        investor,
        investing,
        setInvesting,
        fetchLoading,
        updateLoading,
        selection,
        error,
        fetchInvestor,
        updateInvestor,
        addInvestment,
        updateInvestmentById,
        deleteInvestmentById,
        form,
        makeSelection,
        clearSelection,
        invested,
      }}
    >
      {children}
    </InvestorContext.Provider>
  );
};

// Optional hook
export const useInvestorContext = () => useContext(InvestorContext);


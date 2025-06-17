import { useContext } from "react";
import { InvestorContext } from "../contexts/InvestorContext";

export const useInvestor = () => useContext(InvestorContext);
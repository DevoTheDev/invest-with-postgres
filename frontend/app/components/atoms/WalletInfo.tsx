"use client";
import { useUser } from "@/app/hooks/useProfile";

const WalletInfo = () => {
  const { profile } = useUser();
  return (
    <div className={`
    text-white text-xl font-semibold 
    m-6 text-center flex 
    justify-center bg-gray-600 p-4
    rounded-lg gap-4 w-1/2
    `}>
      <span>Wallet Balance:</span> 
      <span className="text-green-400">${profile?.accountBalance?.toLocaleString()}</span>
    </div>
  );
};

export default WalletInfo;

"use client";
import React, { useState, useRef, useEffect } from "react";
import { useProfile } from "@/app/hooks/useProfile";
import { useInvestor } from "@/app/hooks/useInvestor";
import { useExerciser } from "@/app/hooks/useExerciser";
import CollapsibleSection from "@/app/components/molecules/CollapsibleSection";

const ProfilePage: React.FC = () => {
  const { profile, loading: profileLoading, error: profileError, form: profileForm } = useProfile();
  const { investor, fetchLoading: investorLoading, error: investorError, form: investorForm } = useInvestor();
  const { exerciser, fetchLoading, updateLoading, error: exerciserError, form: exerciserForm, } = useExerciser();
  
  // Combined loading and error states
  if (profileLoading || investorLoading) return <p>Loading data...</p>;
  if (profileError) return <p className="text-red-500">Profile Error: {profileError}</p>;
  if (investorError) return <p className="text-red-500">Investor Error: {investorError}</p>;

  const sections = [
    {
      title: "Personal & Preferences",
      content: profile ? profileForm(true) : <p>No profile data found.</p>,
    },
    {
      title: "Investor Settings",
      content: investor ? investorForm(true) : <p>No investor data found.</p>,
    },
    {
      title: "Fitness Settings",
      content: exerciser ? exerciserForm(true) : <p>No exerciser data found.</p>,
    },
  ];

  return (
    <div className="p-8">
      <CollapsibleSection sections={sections} defaultOpenIndex={0} />
    </div>
  );
};

export default ProfilePage;
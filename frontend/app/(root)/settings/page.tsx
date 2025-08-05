"use client";
import React, { useState, useRef, useEffect } from "react";
import { useProfile } from "@/app/hooks/useProfile";
import { useInvestor } from "@/app/hooks/useInvestor";
import { useExerciser } from "@/app/hooks/useExerciser";
import Accordian from "@/app/components/sections/Accordian";
import BlackSnowBackground from "@/app/components/backgrounds/BlackSnowBackground";

const ProfilePage: React.FC = () => {
  const { profile, loading: profileLoading, error: profileError, form: profileForm } = useProfile();
  const { investor, fetchLoading: investorLoading, error: investorError, form: investorForm } = useInvestor();
  const { exerciser, fetchLoading, updateLoading, error: exerciserError, form: exerciserForm, } = useExerciser();

  // Combined loading and error states
  if (profileLoading || investorLoading) return <p>Loading data...</p>;
  if (profileError) return <p className="text-red-500">Profile Error: {profileError}</p>;
  if (investorError) return <p className="text-red-500">Investor Error: {investorError}</p>;

  return (
      <div className="h-screen flex flex-col justify-start items-center shadow-2xl overflow-auto overflow-y-scroll p-24" >
          <Accordian>
            <Accordian.Section title="Personal & Preferences">
              <>
                {profile ? profileForm(true) : <p>No profile data found.</p>}
              </>
            </Accordian.Section>
            <Accordian.Section title="Investor Settings">
              <>
                {investor ? investorForm() : <p>No investor data found.</p>}
              </>
            </Accordian.Section>
            <Accordian.Section title="Fitness Settings">
              <>
                {exerciser ? exerciserForm(true) : <p>No exerciser data found.</p>}
              </>
            </Accordian.Section>
          </Accordian>
      </div>
  );
};

export default ProfilePage;
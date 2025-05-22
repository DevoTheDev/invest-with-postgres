"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '../../hooks/useProfile';
import { useAuth } from '@/app/hooks/useAuth';

type Props = {}

const AppBuffer = (props: Props) => {
    const router = useRouter();

    const { profile, loading: userLoading } = useProfile();
    const { authLoading, user } = useAuth();

    React.useEffect(() => {
      if (authLoading || userLoading) return;
  
      if (!authLoading && user) {
        router.push("/portfolio");
      } else {
        router.push("/pages/sign-in");
      }
    }, [profile, authLoading, userLoading]);

    
    React.useEffect(() => {
      if(!user) {
        router.push("/pages/sign-in");
      } else {
        router.push("/portfolio");
      }
    }, [user]);
    

  return (
    <div className='m-4' >Loading App...</div>
  )
}

export default AppBuffer
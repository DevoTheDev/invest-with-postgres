"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/useUser';
import { useAuth } from '@/app/hooks/useAuth';

type Props = {}

const AppBuffer = (props: Props) => {
    const router = useRouter();

    const { profile, loading: userLoading } = useUser();
    const { authLoading, user } = useAuth();

    React.useEffect(() => {
      if (authLoading || userLoading) return;
  
      if (!authLoading && user) {
        router.push("/portfolio");
      } else {
        router.push("/pages/sign-in");
      }
    }, [profile, authLoading, userLoading]);
    

  return (
    <div className='m-4' >Loading App...</div>
  )
}

export default AppBuffer
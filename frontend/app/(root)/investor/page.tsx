"use client";
import React from 'react'
import { useAuth } from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';

type Props = {}

const page = (props: Props) => {
    const router = useRouter();
    const { user } = useAuth();
 
    if(!user) {
        router.push("/pages/sign-in");
    }
    
  return (
    <div>Investor</div>
  )
}

export default page
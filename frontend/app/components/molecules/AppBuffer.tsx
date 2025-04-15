"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/useUser';

type Props = {}

const AppBuffer = (props: Props) => {
    const router = useRouter();

    const { profile } = useUser();

    React.useEffect(() => {
        if(profile) {
            router.push("/portfolio");
        } else {
            router.push("/pages/sign-in")
        }
    }, []);

  return (
    <div className='m-4' >Loading App...</div>
  )
}

export default AppBuffer
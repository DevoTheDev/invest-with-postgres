"use client";
import React from 'react'
import { useUser } from '@/app/hooks/useUser';

type Props = {}

const DeleteAccount = (props: Props) => {
    const { deleteUser } = useUser();
  return (
    <div onClick={deleteUser}>
        Delete Account
    </div>
  )
}

export default DeleteAccount
"use client";
import React from 'react'
import { useAuth } from '../../hooks/useAuth';


type Props = {
  styles: string
}

const Logout = (props: Props) => {
    const { logout } = useAuth();

  return (
    <div
    className={props.styles}
    onClick={logout}
    >Logout</div>
  )
}

export default Logout
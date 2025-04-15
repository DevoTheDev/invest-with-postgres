import React from 'react'
import Navigation from '../components/molecules/Navigation'
import Header from '../components/molecules/Header'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <Header />
    {children}
    </>
  )
}

export default layout
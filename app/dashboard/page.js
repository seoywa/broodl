import React from 'react'
import Main from '@/components/Main'
import Dashboard from '@/components/Dashboard'

export const metadata = {
  title: "Broodl ⋅ Dashboard"
}

const Page = () => {
 
  return (
    <Main>
      <Dashboard />
    </Main>
  )
}

export default Page
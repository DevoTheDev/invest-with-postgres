"use client";
import React from 'react';
import Market from '@/app/components/market/Market';
import Accordion from '@/app/components/sections/Accordian';

type Props = {}

const page = () => {

  const sections: { title: string, children: React.ReactNode }[] = [
    { title: "Intraday Series", children: (<Market.TimeSeries.Intraday />), },
    { title: "Daily Series", children: (<Market.TimeSeries.Daily />), },
    { title: "Weekly Series", children: (<Market.TimeSeries.Weekly />), },
    { title: "Monthly Series", children: (<Market.TimeSeries.Monthly />), },


  ]

  return (
    <>
      <div className='p-12'>
        <Accordion>
          {sections.map((s) => {
            return (
              <Accordion.Section title={s.title}>
                {s.children}
              </Accordion.Section>
            )
          })}
        </Accordion>
      </div>
    </>
  )
}

export default page
"use client";
import React from 'react'
import Accordian from '../../sections/Accordian';
import TechStack from '../TechUsed/TechStack';
import MyResume from '../MyResume';
import HeroCard from './HeroCard';

type Props = {}

const HeroCardMobile = (props: Props) => {
    return (
        <div className='lg:w-3/5 tablet-pad-width mobile-pad-width' >
            <Accordian collapsed>
            <Accordian.Section title="Introduction">
                        <HeroCard />
                </Accordian.Section>
                <Accordian.Section title="Tech Stack">
                    <TechStack />
                </Accordian.Section>
                <Accordian.Section title="Resume">
                    <MyResume />
                </Accordian.Section>
            </Accordian>
        </div>
    )
}

export default HeroCardMobile
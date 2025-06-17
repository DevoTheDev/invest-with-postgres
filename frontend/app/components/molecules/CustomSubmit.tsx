"use client";
import React from 'react';

type SubmitConfig = {
    title: string,
    style: string // Tailwind CSS classes expected
}

type CustomSubmitProps = {
    notClicked: SubmitConfig,
    clicked: SubmitConfig,
    icon?: React.ReactNode
}

const CustomSubmit = ({
    notClicked,
    clicked,
    icon
}: CustomSubmitProps) => {

    const [pressed, setPressed] = React.useState(false);

    const config = pressed ? clicked : notClicked;

    const handlePress = () => {
        setPressed(true);
        setTimeout(() => {
            setPressed(false);
        }, 200); // Removed the brackets
    }

    return (
        <button
            type="submit"
            className={config.style}
            onClick={handlePress}
        >
            {icon && icon}
            {config.title}
        </button>
    )
}

export default CustomSubmit;

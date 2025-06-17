"use client";
import React from "react";
import clsx from "clsx";

type GradientProps = {
    colors?: string[]; // Default gradient
};

const getGradient = (colors?: string[]) => {
    const stops = colors ?? ["#45fed5", "#646def", "#f93745"];
    return `bg-gradient-to-r from-[${stops[0]}] via-[${stops[1]}] to-[${stops[2]}]`;
};

const Customs = {
    /**
     * Gradient Text
     */
    Text: ({
        children,
        className,
        colors,
        textSize = "text-base",
        rightSpace,
        leftSpace,
    }: React.PropsWithChildren<
        GradientProps & { className?: string; textSize?: string, rightSpace?: boolean, leftSpace?: boolean }
    >) => {
        const stops = colors ?? ["#45fed5", "#646def", "#f93745"];
        const gradient = `linear-gradient(to right, ${stops.join(", ")})`;

        return (
            <span
                className={clsx(
                    `font-bold bg-clip-text text-transparent animate-gradient bg-[length:200%_200%] ${rightSpace ? 'pr-[0.4rem]': ''} ${leftSpace ? 'pl-[0.4rem]': ''}`,
                    textSize,
                    className
                )}
                style={{ backgroundImage: gradient }}
            >
                {children}
            </span>
        );
    },



    /**
     * Gradient Button
     */
    Button: ({
        children,
        onClick,
        className,
        colors,
        disabled = false,
        type = "button",
    }: React.PropsWithChildren<
        GradientProps & {
            onClick?: () => void;
            className?: string;
            type?: "submit" | "reset" | "button";
            disabled?: boolean;
        }
    >) => {
        const stops = colors ?? ["#45fed5", "#646def", "#f93745"];
        const gradient = `linear-gradient(to right, ${stops.join(", ")})`;

        return (
            <button
                onClick={onClick}
                type={type}
                disabled={disabled}
                className={clsx(
                    "px-5 py-2 rounded-lg text-white font-semibold shadow-md hover:opacity-90 transition-all duration-200",
                    className
                )}
                style={{ backgroundImage: gradient }}
            >
                {children}
            </button>
        );
    },


    /**
     * Gradient Input
     */
    Input: ({
        value,
        onChange,
        placeholder,
        type = "text",
        className,
        colors,
    }: GradientProps & {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        placeholder?: string;
        type?: string;
        className?: string;
    }) => (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={clsx(
                "px-4 py-2 rounded-md border-2 outline-none focus:ring-2 text-white bg-transparent",
                getGradient(colors),
                className
            )}
        />
    ),

    /**
     * Gradient Checkbox
     */
    Checkbox: ({
        checked,
        onChange,
        label,
        className,
        colors,
        id,
    }: GradientProps & {
        checked: boolean;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        label?: string;
        className?: string;
        id?: string;
    }) => (
        <label className={clsx("inline-flex items-center gap-2", className)} htmlFor={id}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className={clsx(
                    "h-5 w-5 rounded border-2 focus:ring-2 transition-all duration-150",
                    getGradient(colors)
                )}
            />
            {label && <span className="text-white">{label}</span>}
        </label>
    ),

    /**
     * Gradient Radio
     */
    Radio: ({
        value,
        checked,
        onChange,
        name,
        label,
        className,
        colors,
        id,
    }: GradientProps & {
        value: string;
        checked: boolean;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        name: string;
        label?: string;
        className?: string;
        id?: string;
    }) => (
        <label className={clsx("inline-flex items-center gap-2", className)} htmlFor={id}>
            <input
                id={id}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={clsx(
                    "h-5 w-5 rounded-full border-2 focus:ring-2 transition-all duration-150",
                    getGradient(colors)
                )}
            />
            {label && <span className="text-white">{label}</span>}
        </label>
    ),

    /**
     * Gradient Textarea
     */
    Textarea: ({
        value,
        onChange,
        placeholder,
        className,
        colors,
    }: GradientProps & {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
        placeholder?: string;
        className?: string;
    }) => (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={clsx(
                "w-full px-4 py-2 rounded-md border-2 outline-none focus:ring-2 text-white bg-transparent",
                getGradient(colors),
                className
            )}
            rows={5}
        />
    ),
};

export default Customs;

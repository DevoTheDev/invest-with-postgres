"use client";
import { useForm, Path } from "react-hook-form"
import React from 'react';
import { capitalize, formatHeader } from "@/app/utils/stringUtils";
import { HideOptions, TailwindOptions } from "@/app/types/UtilityTypes";
import { targeted } from "@/app/types/UtilityTypes";


type FormProps<T extends object> = HideOptions<T> & TailwindOptions<T> & {
    values: T;
    submit: {
        label: string,
        onSubmit: (props?: any) => any;
    }
}

const HookForm = <T extends object>({
    values,
    submit,
    ...targeting
}: FormProps<T>) => {
    const { register, handleSubmit } = useForm<T>();

    const { containerStyle, buttonStyle } = targeted(targeting);

    return (
        <>

            <form className={containerStyle}>
                {Object.entries(values).map(([k, v], i) => {

                    const { hide, style, keyContainerStyle } = targeted(targeting, k)

                    if (hide) {
                        return;
                    };

                    return (
                        <div key={`${k}-${i}`} className={keyContainerStyle}>
                            <label className={style?.key}>{formatHeader(k)}</label>
                            <input className={style?.val} {...register((k) as Path<T>)} placeholder={v} />
                        </div>
                    )
                })}
            </form>
            <button
                onClick={handleSubmit(submit.onSubmit)}
                className={buttonStyle}>
                {submit.label}
            </button>
        </>
    )
}

export default HookForm
"use client";
import { SaveIcon } from "lucide-react";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import CustomSubmit from "../molecules/CustomSubmit";

// NOTICE: To be used in conjunction with react-hook-form

export const HookForm = {
  /**
   * Section Header Wrapper
   */
  Section: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-3">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  ),

  /**
   * Input Field Component (number/text types)
   */
  InputField: ({
    label,
    id,
    type = "text",
    register,
    placeholder,
    error,
    min,
  }: {
    label: string;
    id: string;
    type?: string;
    register: UseFormRegisterReturn;
    placeholder?: string;
    error?: FieldError;
    min?: number;
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        placeholder={placeholder}
        min={min}
        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      />
      {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
    </div>
  ),

  /**
   * Select Field Component
   */
  SelectField: ({
    label,
    id,
    register,
    options,
    placeholder,
    error,
  }: {
    label: string;
    id: string;
    register: UseFormRegisterReturn;
    options: string[];
    placeholder?: string;
    error?: FieldError;
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        {...register}
        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <option value="">{placeholder ?? `Select ${label}`}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
    </div>
  ),

  /**
   * Checkbox Field (single checkbox)
   */
  CheckBoxField: ({
    label,
    id,
    register,
    error,
  }: {
    label: string;
    id: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
  }) => (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        type="checkbox"
        {...register}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
    </div>
  ),

  /**
   * Loading/Error Display
   */
  LoadingOrError: ({ loading, error }: { loading?: boolean; error?: string }) => {
    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-red-600 font-medium">Error: {error}</p>;
    return null;
  },

  /**
   * Date Display Section
   */
  DateInfo: ({ created, updated }: { created?: string; updated?: string }) => (
    <div className="text-sm text-gray-500 space-y-1">
      {created && (
        <p>
          <strong>Created:</strong> {new Date(created).toLocaleString()}
        </p>
      )}
      {updated && (
        <p>
          <strong>Last Updated:</strong> {new Date(updated).toLocaleString()}
        </p>
      )}
    </div>
  ),

  /**
   * Save Button (floating)
   */
  SubmitButton: () => (
    <div className="text-sm text-gray-500 space-y-1 flex justify-end">
      <CustomSubmit
        icon={<SaveIcon />}
        notClicked={{
          title: "Save Changes",
          style: `
            bg-blue-500 flex justify-between items-center 
            gap-3 rounded-md font-bold text-md text-white 
            px-4 py-2
          `,
        }}
        clicked={{
          title: "Saving...",
          style: `
            bg-blue-300 flex justify-between items-center 
            gap-3 rounded-md font-bold text-md text-white 
            px-4 py-2
          `,
        }}
      />
    </div>
  ),
};

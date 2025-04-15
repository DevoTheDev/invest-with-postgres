'use client'

import React, { useState } from 'react'

type DropdownSelectorProps = {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  label?: string
  buttonClassName?: string
  optionsClassName?: string
  optionItemClassName?: string
  iconClassName?: string
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  options,
  value,
  onChange,
  label,
  buttonClassName = '',
  optionsClassName = '',
  optionItemClassName = '',
  iconClassName = '',
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen)

  const handleSelect = (val: string) => {
    onChange(val)
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block w-full max-w-xs">
      {label && <span className="block text-sm text-zinc-600 dark:text-zinc-300 mb-2">{label}</span>}
      <div
        className={`${buttonClassName}`}
        onClick={handleToggle}
      >
        <span>{options.find(option => option.value === value)?.label}</span>
        <svg
          className={`${isOpen ? 'rotate-180' : ''} ${iconClassName}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className={`absolute ${optionsClassName}`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`${optionItemClassName}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownSelector

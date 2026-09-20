'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'select';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  pattern?: string;
  options?: Option[];
  error?: string;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function FormField({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  required = false,
  disabled = false,
  maxLength,
  pattern,
  options = [],
  error,
  helperText,
  onChange,
  onBlur,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const helperId = `${id}-helper`;

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        <span>{label}</span>
        {required && <span className="required-asterisk" aria-hidden="true">*</span>}
      </label>

      {type === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          className="form-select"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          pattern={pattern}
          onChange={onChange}
          onBlur={onBlur}
          className="form-input"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
        />
      )}

      {error ? (
        <p id={errorId} className="form-error" role="alert">
          <span style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <AlertCircle size={14} />
          </span>
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={helperId} className="form-helper">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

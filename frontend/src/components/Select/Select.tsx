import { useId, type SelectHTMLAttributes } from 'react'
import styles from '../Field/Field.module.css'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  /** Optional first, empty choice such as "Select a role". */
  placeholder?: string
  error?: string
}

/** Native select with a label and error message, styled like Input. */
export default function Select({
  label,
  options,
  placeholder,
  error,
  id,
  className,
  ...rest
}: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const errorId = `${selectId}-error`

  return (
    <div className={styles.field}>
      <label htmlFor={selectId} className={styles.label}>
        {label}
      </label>
      <select
        id={selectId}
        className={[styles.control, error && styles.invalid, className].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  )
}

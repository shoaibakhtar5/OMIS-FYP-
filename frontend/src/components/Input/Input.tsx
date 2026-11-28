import { useId, type InputHTMLAttributes } from 'react'
import styles from '../Field/Field.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
  error?: string
}

/** Text input with a label, an optional hint and an error message. */
export default function Input({ label, hint, error, id, className, ...rest }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`
  const message = error ?? hint

  return (
    <div className={styles.field}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={[styles.control, error && styles.invalid, className].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        {...rest}
      />
      {message && (
        <span id={messageId} className={error ? styles.error : styles.hint}>
          {message}
        </span>
      )}
    </div>
  )
}

import { Link } from 'react-router'
import styles from './pages.module.css'

interface ErrorPageProps {
  code: string
  title: string
  message: string
}

/** Used for "not found" and "no access" screens. */
export default function ErrorPage({ code, title, message }: ErrorPageProps) {
  return (
    <div className={styles.centered}>
      <div className={styles.errorBox}>
        <span className={styles.errorCode}>{code}</span>
        <h1>{title}</h1>
        <p className={styles.muted}>{message}</p>
        <Link to="/">Go to your home page</Link>
      </div>
    </div>
  )
}

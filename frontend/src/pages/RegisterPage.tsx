import { Link } from 'react-router'
import Card from '../components/Card/Card'
import styles from './pages.module.css'

/** Placeholder for organization registration (A-02). */
export default function RegisterPage() {
  return (
    <div className={styles.centered}>
      <Card className={styles.authCard}>
        <div className={styles.authBrand}>
          <h1>Register</h1>
          <p>Organization registration will be built in A-02.</p>
        </div>
        <p className={styles.note}>
          <Link to="/login">Back to sign in</Link>
        </p>
      </Card>
    </div>
  )
}

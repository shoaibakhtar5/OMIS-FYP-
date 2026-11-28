import Badge from '../components/Badge/Badge'
import Card from '../components/Card/Card'
import styles from './pages.module.css'

interface PlaceholderPageProps {
  title: string
  description: string
  workPackage: string
}

/** Stand-in for a screen that has not been built yet. */
export default function PlaceholderPage({ title, description, workPackage }: PlaceholderPageProps) {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1>{title}</h1>
        <Badge tone="primary">{workPackage}</Badge>
      </header>
      <Card>
        <p className={styles.muted}>{description}</p>
        <p className={styles.note}>
          This screen is a placeholder and will be built in {workPackage}.
        </p>
      </Card>
    </div>
  )
}

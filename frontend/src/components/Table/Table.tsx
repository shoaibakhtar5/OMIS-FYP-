import type { ReactNode } from 'react'
import styles from './Table.module.css'

export interface TableColumn<Row> {
  /** Unique key for the column. */
  key: string
  header: string
  /** How to show a cell. Defaults to row[key] as text. */
  render?: (row: Row) => ReactNode
  align?: 'left' | 'right'
}

interface TableProps<Row> {
  columns: TableColumn<Row>[]
  rows: Row[]
  getRowKey: (row: Row) => string
  emptyMessage?: string
  caption?: string
}

/** Simple data table. Pass columns and rows; cells are text unless a render is given. */
export default function Table<Row>({
  columns,
  rows,
  getRowKey,
  emptyMessage = 'Nothing to show yet.',
  caption,
}: TableProps<Row>) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        {caption && <caption className="visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={column.align === 'right' ? styles.right : ''}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={getRowKey(row)}>
                {columns.map((column) => (
                  <td key={column.key} className={column.align === 'right' ? styles.right : ''}>
                    {column.render
                      ? column.render(row)
                      : String((row as Record<string, unknown>)[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

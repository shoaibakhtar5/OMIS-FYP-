import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Table, { type TableColumn } from './Table'

interface Row {
  id: string
  title: string
}

const columns: TableColumn<Row>[] = [
  { key: 'title', header: 'Title' },
  { key: 'actions', header: 'Actions', render: (row) => <button>Open {row.title}</button> },
]

describe('Table', () => {
  it('renders a row per item, using render() when given', () => {
    render(
      <Table
        columns={columns}
        rows={[{ id: '1', title: 'Sprint review' }]}
        getRowKey={(r) => r.id}
      />,
    )
    expect(screen.getByRole('columnheader', { name: 'Title' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Sprint review' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open Sprint review' })).toBeInTheDocument()
  })

  it('shows the empty message when there are no rows', () => {
    render(<Table columns={columns} rows={[]} getRowKey={(r) => r.id} emptyMessage="No meetings" />)
    expect(screen.getByText('No meetings')).toBeInTheDocument()
  })
})

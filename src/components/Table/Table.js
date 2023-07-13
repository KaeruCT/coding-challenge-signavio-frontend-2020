import React from "react"
import "./Table.css"

const SortIcon = ({ ascending }) => (
    <img
        src={`./icons/order-${ascending ? 'ascending' : 'descending'}.svg`}
        alt="" />
)

const TableHeader = ({ columns, sort, doSort, search, doSearch }) => (
    <thead>
        <tr>
            {columns.map(col => {
                const isSortingColumn = sort.by === col.id
                let ariaSort = 'none'
                if (isSortingColumn) {
                    ariaSort = sort.ascending ? 'ascending' : 'descending'
                }

                let className = col.type
                if (isSortingColumn) {
                    className += 'sort'
                }

                let title = col.title
                if (title === 'Number') {
                    // "magic" rule to change 'Number' column to '#'
                    // without modifying the data.json file
                    title = '#'
                }

                return (
                    <th
                        key={col.id}
                        aria-sort={ariaSort}
                        role="columnheader"
                        className={className}>
                        <button onClick={() => doSort(col.id)}>
                            <span>{title}</span>
                            {isSortingColumn && (
                                <SortIcon ascending={sort.ascending} />
                            )}
                        </button>
                    </th>
                )
            })}
        </tr>
        <tr>
            <td colSpan={columns.length}>
                <div className="search">
                    <input
                        placeholder="Enter your search here..."
                        type="search"
                        value={search}
                        onChange={e => doSearch(e.target.value)} />
                </div>
            </td>
        </tr>
    </thead>
)

const TableRows = ({ columns, rows }) => {
    if (!rows.length) {
        return (
            <tbody>
                <tr>
                    <td className="no-results" colSpan={columns.length}>
                        No results :(
                    </td>
                </tr>
            </tbody>
        )
    }
    return (
        <tbody>
            {rows.map((row => (
                <tr key={row.id}>
                    {columns.map(col => (
                        <td key={col.id}>
                            <div className={`cell ${col.type}`}>
                                {row[col.id]}
                            </div>
                        </td>
                    ))}
                </tr>
            )))}
        </tbody>
    )
}

const Table = ({ columns, rows, sort, doSort, search, doSearch }) => (
    <table className="table">
        <TableHeader
            columns={columns}
            sort={sort}
            doSort={doSort}
            search={search}
            doSearch={doSearch} />
        <TableRows columns={columns} rows={rows} />
    </table>
)

export default Table

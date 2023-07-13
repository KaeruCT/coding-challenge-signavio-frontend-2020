import React, { useMemo, useState } from "react"
import { guessColumnTypes, processTableData } from "../util"
import Table from "./Table"


const TableContainer = ({ tableData: { columns, rows } = {} }) => {
    const [sort, setSort] = useState({ by: '', ascending: true })
    const [searchTerm, setSearchTerm] = useState('')

    function doSort(newBy) {
        setSort({
            by: newBy,
            ascending: sort.by === newBy ? !sort.ascending : true,
        })
    }

    const processedData = useMemo(
        () => processTableData({
            columns,
            rows,
            sort,
            searchTerm,
        }),
        [columns, rows, sort, searchTerm]
    )

    return (
        <Table
            columns={columns}
            rows={processedData}
            doSort={doSort}
            sort={sort}
            search={searchTerm}
            doSearch={setSearchTerm} />
    )
}

export default ({ tableData }) => (
    <TableContainer tableData={guessColumnTypes(tableData)} />
)

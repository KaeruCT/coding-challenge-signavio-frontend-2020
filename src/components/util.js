const typeMatchers = {
    number: value => typeof value === 'number' || /^\d+$/.test(value + ''),
    date: value => /^\d{2}-\d{2}-\d{4}$/.test(value),
}

const formatters = {
    number: value => {
        const number = Number(value)
        if (isNaN(number)) return value
        return number.toLocaleString()
    },
    date: value => {
        const date = parseDate(value)
        return date
            ? `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
            : value
    },
}

const comparators = {
    number: (a, b) => a - b,
    string: (a, b) => a.localeCompare(b),
    date: (a, b) => {
        let dateA = parseDate(a)
        let dateB = parseDate(b)

        if (dateA && dateB) {
            return dateA.getTime() - dateB.getTime()
        }

        if (!dateA && !dateB) {
            return 0
        }

        if (!dateA) {
            return 1
        }

        if (!dateB) {
            return -1
        }
    },
}

function parseDate(value) {
    value += '' // force string type
    if (value.indexOf('-') !== -1) {
        const [day, month, year] = value.split('-')
        const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10))
        if (isNaN(date.getTime())) {
            return undefined
        }
        return date
    }
    return undefined
}

function formatCell(value, type) {
    const formatter = formatters[type]
    return formatter ? formatter(value) : value
}

function formatTableRows({ columns, rows }) {
    return rows.map(
        row => {
            let rowId = ''
            const formattedRow = Object.keys(row).reduce((result, id) => {
                const col = columns.find(col => col.id === id)
                result[id] = formatCell(row[col.id], col.type)
                rowId += row[col.id]
                return result
            }, {})
            formattedRow.id = rowId
            return formattedRow
        }
    )
}

function compare(a, b, type) {
    return comparators[type](a, b)
}

function sortTableRows({ columns, rows, sort: { by, ascending } }) {
    const col = columns.find(col => col.id === by)
    if (!col || !col.type) return rows
    return rows.sort((a, b) => {
        const aVal = a[col.id]
        const bVal = b[col.id]
        return ascending
            ? compare(aVal, bVal, col.type)
            : compare(bVal, aVal, col.type)
    })
}

function filterRows({ rows, searchTerm }) {
    const searchLower = searchTerm.trim().toLowerCase()
    if (!searchLower) return rows

    return rows.filter(row => Object.keys(row).some(id => {
        if (id === 'id') return false

        const value = (row[id] + '').trim().toLowerCase()
        return value.indexOf(searchLower) !== -1
    }))
}

function guessType(values) {
    const countByMatchers = Object.keys(typeMatchers).reduce((count, matcher) => {
        const matchedValues = values.filter(value => typeMatchers[matcher](value))
        count[matcher] = matchedValues.length
        return count
    }, {})

    const matchedTypes = Object
        .keys(typeMatchers)
        .filter(matcher => countByMatchers[matcher] > 0)
        .sort((a, b) => countByMatchers[b] - countByMatchers[a])

    if (matchedTypes.length) {
        return matchedTypes[0]
    }
    // if no types matched, default to a string
    return 'string' 
}

export function guessColumnTypes({ columns, rows }) {
    return {
        columns: columns.map(col => {
            const colValues = rows.reduce((values, row) => {
                values.push(row[col.id])
                return values
            }, [])

            return {
                ...col,
                type: guessType(colValues)
            }
        }),
        rows,
    }
}

export function processTableData({ columns, rows, sort, searchTerm }) {
    rows = sortTableRows({ columns, rows, sort })
    rows = formatTableRows({ columns, rows })
    rows = filterRows({ rows, searchTerm })
    return rows
}

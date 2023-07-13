import React, { Component } from 'react'
import './App.css'
import Table from './components/Table'
import tableData from './data'

class App extends Component {
    render() {
        return <Table tableData={tableData} />
    }
}

export default App

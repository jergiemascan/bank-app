import React, { useState } from "react"
import TransactionForm from "./components/transactions/TransactionForm"
import AccountHistory from "./components/transactions/AccountHistory"
import "./components/transactions/Transaction.css"
import { apiUrl } from "./config"

function App() {
  const [status, setStatus] = useState({
    isError: false,
    message: "You have no transactions yet.",
  })
  const [transactionsHistory, setTransactionsHistory] = useState([])

  const getAllTransactions = async accountId => {
    try {
      const response = await apiUrl.get(`/accounts/${accountId}`)
      if (response?.status === 200 && response?.data?.length > 0) {
        setTransactionsHistory(response?.data)
        setStatus({ isError: false, message: response?.data?.message })
      }
    } catch (error) {
      setStatus({ isError: true, message: error.message })
    }
  }

  return (
    <main className="container">
      <TransactionForm getAccountHistory={getAllTransactions} />
      <AccountHistory
        accountTransactionsHistory={transactionsHistory}
        status={status}
      />
    </main>
  )
}

export default App

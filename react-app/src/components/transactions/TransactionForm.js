import React, { useEffect, useState } from "react"
import useFormInput from "../../hooks/useFormInput"
import StatusMessage from "../StatusMessage"
import "./Transaction.css"
import { apiUrl } from "../../config"

const TransactionForm = ({ getAccountHistory }) => {
  const [status, setStatus] = useState({ isError: false, message: "" })
  const {
    inputData: inputValue,
    handleFormInput,
    resetFormInput,
  } = useFormInput({ accountId: "", amount: "" })
  let timer

  const uuidRegexPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  const handleSubmitForm = async e => {
    e.preventDefault()
    try {
      if (!uuidRegexPattern.test(inputValue.accountId)) {
        setStatus({
          isError: true,
          message:
            "Please provide a valid account id containing 32 hexadecimal characters ex. 0afd02d3-6c59-46e7-b7bc-893c5e0b7ac3",
        })
        return
      }
      const data = {
        accountId: inputValue.accountId,
        amount: inputValue.amount,
      }
      const response = await apiUrl.post("/transactions", data)

      getAccountHistory(inputValue.accountId)
      resetFormInput()
      setStatus({ isError: false, message: response.data?.message })
      timer = setTimeout(() => {
        setStatus({ isError: false, message: "" })
      }, 3000)
    } catch (error) {
      setStatus({
        isError: true,
        message: error.message,
      })
    }
  }

  useEffect(() => {
    return () => clearTimeout(timer)
  }, [timer])

  return (
    <form onSubmit={handleSubmitForm}>
      <h1>Add new transaction</h1>
      <div className="input-container">
        <label htmlFor="accountId">Account ID:</label>
        <input
          type="text"
          className="form-input"
          data-type="account-id"
          name="accountId"
          value={inputValue.accountId}
          onChange={handleFormInput}
          required
        />
      </div>

      <div className="input-container">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          className="form-input"
          data-type="amount"
          name="amount"
          value={inputValue.amount}
          onChange={handleFormInput}
          required
        />
      </div>

      {status && <StatusMessage status={status} />}

      <button className="btn" data-type="transaction-submit" type="submit">
        Submit
      </button>
    </form>
  )
}

export default TransactionForm

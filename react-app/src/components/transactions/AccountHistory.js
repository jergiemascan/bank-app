import React from "react"
import StatusMessage from "../StatusMessage"
import "./Transaction.css"

const AccountHistory = ({ accountTransactionsHistory, status }) => {
  return (
    <section className="history-wrapper">
      <h1>Transaction history</h1>
      <div className="history">
        {status && <StatusMessage status={status} />}
        {accountTransactionsHistory
          .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
          .slice(0, 3)
          .map((transaction, index) => {
            return (
              <div
                className="history-list"
                key={index}
                data-type="transaction"
                data-amount={transaction.amount}
                data-account-id={transaction.account_id}
                data-balance={transaction.currentBalance}
              >
                <h2 className="transaction-type">
                  Transaction type ({transaction.transactionType})
                </h2>
                <div className="history-items">
                  <p>
                    Transferred {transaction.amount}$ from account "
                    {transaction.accountId}"
                  </p>
                  {index === 0 && (
                    <p>
                      The current account balance is{" "}
                      {transaction.currentBalance}$
                    </p>
                  )}
                </div>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default AccountHistory

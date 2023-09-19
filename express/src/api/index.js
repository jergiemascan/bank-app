const express = require("express")
const router = express.Router()
const { v4: uuidv4 } = require("uuid")

router.get("/ping", (req, res) => {
  res.send("pong")
})

const transactions = []

router.post("/transactions", (req, res) => {
  let { accountId, amount } = req.body
  const transactionId = uuidv4()
  try {
    if (!accountId || !amount  || typeof amount !== 'number' ) {
      res.status(403).json({ message: "Please enter an account id or amount" })
    } else {
      const timeStamp = new Date()
      const transactionType = amount > 0 ? "deposit" : "withdrawal"

      // it's able to withdraw or create a transactions with negative balance.
      const currentBalance = transactions
        .filter(trans => trans.accountId === accountId)
        .reduce((acc, curr) => {
          return transactionType === "deposit"
            ? acc + curr.amount + amount
            : acc - curr.amount - amount
        }, 0)

      const transaction = {
        accountId,
        amount,
        transactionId,
        transactionType,
        currentBalance,
        timeStamp,
      }
      transactions.push(transaction)
      res
        .status(200)
        .json({ message: "Your transfer was successful", data: transaction })
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message })
  }
})

router.get("/accounts/:accountId", (req, res) => {
  try {
    const getAccountsById = transactions.filter(
      acctId => acctId.accountId === req.params.accountId
    )
    if (!getAccountsById) {
      res.json("No transaction found with that accountId")
    }
    res.status(200).json(getAccountsById)
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message })
  }
})

router.get("/transactions", (req, res) => {
  try {
    if (transactions.length > 0) {
      res.status(200).json({
        data: transactions,
        status: "success",
        message: "Successfully fetched all transactions",
      })
    }
    res.json("No transactions found")
  } catch (err) {
    res.json({message:"There's a problem in getting your transactions",  error: err.message})
  }
})

router.get("/transactions/:transactionId", (req, res) => {
  try {
    const getTransactionsById = transactions.filter(
      id => id.transactionId === req.params.transactionId
    )
    if (!getTransactionsById) {
      res.json("No transactions found with that id")
    }
    res.status(200).json(getTransactionsById)
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message })
  }
})

module.exports = router

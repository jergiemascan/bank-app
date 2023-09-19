import React from "react"

const StatusMessage = ({ status }) => {
  return (
    <strong style={{ color: status.isError === false ? "green" : "red" }}>
      {status.message}
    </strong>
  )
}

export default StatusMessage

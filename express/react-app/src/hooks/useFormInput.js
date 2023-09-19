import { useState } from "react"

const useFormInput = initialState => {
  const [inputData, setInputData] = useState(initialState)

  const handleFormInput = e => {
    const { name } = e.target
    const value = e.target.value.trim()

    setInputData(prev => ({
      ...prev,
      [name]:
        name === "amount" ? (value === "0" ? 0 : parseFloat(value)) : value,
    }))
  }

  const resetFormInput = () => {
    setInputData(initialState)
  }
  return { inputData, handleFormInput, resetFormInput }
}

export default useFormInput

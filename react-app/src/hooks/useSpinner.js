import { useState } from "react"

const useSpinner = (initialState = false) => {
  const [loading, setLoading] = useState(initialState)

  const toggleSpinner = () => {
    setLoading(prevState => !prevState)
  }

  return [loading, toggleSpinner]
}
export default useSpinner

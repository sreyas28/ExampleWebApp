import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")

  // Example fetch to backend
  const fetchMessage = async () => {
    try {
      const res = await fetch("http://13.201.77.105:9091/reply") // adjust to your backend route
      const data = await res.json()
      console.log(data)
      setMessage(data.message)
    } catch (err) {
      setMessage("Error fetching from backend or Backend is not Setup")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Hello from the FrontEnd 🚀 v3
      </h1>

      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Count is {count}
      </button>

      <button
        onClick={fetchMessage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Fetch from Backend
      </button>

      {message && (
        <p className="mt-4 text-lg text-gray-700">
          Backend says: {message}
        </p>
      )}
    </div>
  )
}

export default App

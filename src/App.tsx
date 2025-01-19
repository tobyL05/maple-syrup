import React, { useEffect } from 'react'
import './App.css';
import BudgetSaver from './components/BudgetSaver'

function App() {

    useEffect(() => {
        chrome.storage.sync.get(['maxBudget'], (result) => {
            console.log(result.maxBudget)
        })
    },[])

  return (
    <div className={""}>
        <h1 className="text-2xl font-bold">Maple Syrup</h1>
        <h2 className="text-lg font-semibold">Save money when you shop online</h2>
        <BudgetSaver />
    </div>
  )
}

export default App

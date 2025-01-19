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
        <h1 className="text-2xl font-bold">Maple Syrup is on!</h1>
    </div>
  )
}

export default App

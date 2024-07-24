import { useState } from 'react'
import CurrencyConverter from './components/CurrencyConverter'

function App() {

  return (
    <>
      <div 
        style={{backgroundImage: `url(https://images.unsplash.com/photo-1580519542036-c47de6196ba5?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`}} 
        className='min-h-screen bg-gray-500 flex flex-col items-center justify-center'>
        <div className='container'>
          <CurrencyConverter/>
          <p className="text-bold text-lg text-center">Visit developer @ <a href="https://sauraverse.com" target="_blank">sauraverse.com</a></p>
        </div>
        
      </div>
    </>
  )
}

export default App

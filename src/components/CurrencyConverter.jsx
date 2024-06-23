import React, { useState, useEffect } from 'react'
import Dropdown from './Dropdown';

function CurrencyConverter() {

    const [currencies, setCurrencies]= useState([])
    const [amount, setAmount] = useState(1)

    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("IND")

    const fetchCurrencies = async ()=>{
        try {
            const res = await fetch("https://api.frankfurter.app/currencies")
            const data = await res.json();

            setCurrencies(Object.keys(data));
        } catch (error) {
            console.error("Error while fetching", error);
        }
    }

    useEffect(() => {
      fetchCurrencies();
    }, [])
    
    const currencyConvert = ()=>{

    }
  return (
    <div id='OutBox' className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Converter</h2>

        <div>
            <Dropdown 
                currencies={currencies} 
                title='From:'
                // currency={fromCurrency}
            />
            {/* swap Button */}
            <Dropdown currencies={currencies} title='To:'/>
        </div>
        <div className='mt-4'>
            <label htmlFor="amount" className='block text-sm font-medium text-gray-700'>Amount:</label>
            <input 
                type="number"
                value={amount}
                onChange={(e)=> setAmount(e.target.value)}
                className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'
            />
        </div>
        <div className='flex justify-end mt-6'>
            <button 
                onClick={currencyConvert}
                className='px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Convert</button>
        </div>

        <div className='mt-4 text-lg font-medium text-right text-green-600'>Converted Amount: 83 USD</div>
    </div>
  )
}

export default CurrencyConverter
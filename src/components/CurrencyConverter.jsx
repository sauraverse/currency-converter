import React, { useState, useEffect } from 'react'
import Dropdown from './Dropdown';
import { HiArrowsRightLeft } from 'react-icons/hi2';

function CurrencyConverter() {

    const [currencies, setCurrencies]= useState([])
    const [amount, setAmount] = useState(1)

    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR")

    const [convertedAmount, setConvertedAmount] = useState(null)
    const [converting, setConverting] = useState(false)

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
    
    const currencyConvert = async()=>{
        if(!amount)return
        setConverting(true)
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await res.json();

            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency)
        } catch (error) {
            console.error("Error while fetching", error);
        } finally{
            setConverting(false)
        }
    }

    const handleFavorite = (currency)=>{
        //add to favorite
    }

    const swapCurrency = ()=>{
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

  return (
    <div id='OutBox' className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-7 text-2xl font-semibold text-gray-700 text-center'>Currency Converter</h2>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
            <Dropdown 
                currencies={currencies} 
                title='From:'
                currency={fromCurrency}
                setCurrency={setFromCurrency}
                handleFavorite={handleFavorite}
            />

            <div id='swap' className='flex justify-center -mb-5 sm:mb-0'>
                <button onClick={swapCurrency} className='p-3 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                    <HiArrowsRightLeft className='text-xl text-gray-700'/>
                </button>
            </div>

            <Dropdown 
                currencies={currencies} 
                title='To:' 
                currency={toCurrency}
                setCurrency={setToCurrency}
                handleFavorite={handleFavorite}/>
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
                className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting? 'animate-pulse':''}`}>Convert</button>
        </div>

        <div className='mt-4 text-lg font-medium text-right text-green-600'>Converted Amount: {convertedAmount}</div>
    </div>
  )
}

export default CurrencyConverter
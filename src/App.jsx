import React, { useState } from 'react';

function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [exchangedValue, setExchangedValue] = useState("");
  const [value, setValue] = useState(100);

  const setCurrencyValue = (e) => {
    setFrom(e.target.value);
  };

  const setCurrencyValue2 = (e) => {
    setTo(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const exchange = async () => {
    try {
      const host = "api.frankfurter.app";
      const res = await fetch(`https://${host}/latest?amount=${value}&from=${from}&to=${to}`);
      const data = await res.json();  
      console.log(data);
      const exchangedAmount = data.rates[to];  
      setExchangedValue(`${value} ${from} = ${exchangedAmount} ${to}`);
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setExchangedValue("Error fetching exchange rate");
    }
  };

  return (
    <div className="container"> 
      <input type='number' onChange={handleValueChange} value={value} />
      <select onChange={setCurrencyValue} value={from}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={setCurrencyValue2} value={to}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <button onClick={exchange}>Exchange</button>
      <div id="exchangedValue">{exchangedValue}</div>
    </div>
  );
}

export default App;

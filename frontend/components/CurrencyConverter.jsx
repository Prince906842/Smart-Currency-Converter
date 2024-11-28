import React, { useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState("EUR,GBP");
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    setLoading(true);
    setError(null);
    setExchangeRates(null);

    try {
      const response = await axios.get("http://localhost:4000/convert", {
        params: { base_currency: baseCurrency, currencies },
      });
      setExchangeRates(response.data.data);
    } catch (err) {
      setError("Failed to fetch exchange rates.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Currency Converter
      </h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="baseCurrency"
        >
          Base Currency
        </label>
        <input
          id="baseCurrency"
          type="text"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter base currency (e.g., USD)"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="currencies"
        >
          Target Currencies
        </label>
        <input
          id="currencies"
          type="text"
          value={currencies}
          onChange={(e) => setCurrencies(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter target currencies (e.g., EUR,GBP)"
        />
      </div>
      <button
        onClick={handleConvert}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Converting..." : "Convert"}
      </button>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {exchangeRates && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Exchange Rates
          </h2>
          <ul>
            {Object.entries(exchangeRates).map(([currency, rate]) => (
              <li key={currency} className="flex justify-between py-2 border-b">
                <span className="text-gray-700">{currency}</span>
                <span className="font-semibold text-gray-900">
                  {rate.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;

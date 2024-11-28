import React from "react";

const History = ({ history }) => {
  return (
    <div className="mt-6 h-1/3">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Conversion History
      </h2>
      <ul className="">
        {history.map((entry, index) => (
          <li key={index} className="text-gray-700 mb-2">
            {entry.amount} {entry.baseCurrency} converted to
            {entry.result} {entry.selectedCurrency} on
            {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

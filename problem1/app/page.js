"use client"
import { useState } from 'react';

const fetchNumbers = async (id) => {
    const response = await fetch(`/api/numbers/${id}`);
    return response.json();
};

export default function Home() {
    const [id, setId] = useState('');
    const [result, setResult] = useState(null);

    const handleFetch = async () => {
        const data = await fetchNumbers(id);
        setResult(data);
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <input
                type="text"
                placeholder="Enter number ID (p, f, e, r)"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <button onClick={handleFetch}>Fetch Number</button>
            {result && (
                <div>
                    <h2>Results</h2>
                    <p>Window Previous State: {JSON.stringify(result.windowPrevState)}</p>
                    <p>Window Current State: {JSON.stringify(result.windowCurrState)}</p>
                    <p>Numbers: {JSON.stringify(result.numbers)}</p>
                    {result.avg !== null && <p>Average: {result.avg}</p>}
                </div>
            )}
        </div>
    );
}

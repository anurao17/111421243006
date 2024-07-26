import axios from 'axios';

let numbers = [];

export default async function handler(req, res) {
    const windowSize = 10;
    const apiUrl = req.query.url;

    const fetchNumber = async (url) => {
        try {
            const response = await axios.get(url, { timeout: 500 });
            return parseInt(response.data);
        } catch (error) {
            console.error(`Error fetching number: ${error.message}`);
            return null;
        }
    };

    const storeNumber = (number) => {
        if (number !== null && !numbers.includes(number)) {
            if (numbers.length >= windowSize) {
                numbers.shift();
            }
            numbers.push(number);
        }
    };

    const calculateAverage = () => {
        return numbers.reduce((a, b) => a + b, 0) / numbers.length;
    };

    const windowPrevState = [...numbers];
    const fetchedNumber = await fetchNumber(apiUrl);
    storeNumber(fetchedNumber);
    const windowCurrState = [...numbers];
    const avg = numbers.length > 0 ? calculateAverage() : null;

    res.status(200).json({
        windowPrevState: windowPrevState,
        windowCurrState: windowCurrState,
        numbers: fetchedNumber !== null ? [fetchedNumber] : [],
        avg: avg !== null ? avg.toFixed(2) : null,
    });
}

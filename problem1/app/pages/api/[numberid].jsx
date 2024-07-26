import axios from 'axios';

let numbers = [];

const windowSize = 10;
const apiUrls = {
    p: 'http://20.244.56.144/test/prime',
    f: 'http://20.244.56.144/test/fibonacci',
    e: 'http://20.244.56.144/test/even',
    r: 'http://20.244.56.144/test/random'
};

const fetchNumber = async (url) => {
    try {
        const response = await axios.get(url, { timeout: 500 });
        return parseInt(response.data);
    } catch (error) {
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

export default async function handler(req, res) {
    const { numberid } = req.query;

    if (!apiUrls[numberid]) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const windowPrevState = [...numbers];
    const fetchedNumber = await fetchNumber(apiUrls[numberid]);
    storeNumber(fetchedNumber);
    const windowCurrState = [...numbers];
    const avg = numbers.length > 0 ? calculateAverage().toFixed(2) : null;

    res.status(200).json({
        windowPrevState: windowPrevState,
        windowCurrState: windowCurrState,
        numbers: fetchedNumber !== null ? [fetchedNumber] : [],
        avg: avg
    });
}

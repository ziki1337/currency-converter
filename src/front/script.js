document.getElementById('convertButton').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (!amount || isNaN(amount) || amount <= 0) 
    {
        alert('Please enter a valid amount');
        return;
    }

    const requestBody = {
        num: parseFloat(amount),
        preCurr: fromCurrency,
        postCurr: toCurrency
    };

    try 
    {
        const response = await fetch('http://localhost:2727/currency-converter/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) 
        {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { fromCurrency, toCurrency, amount, convertedAmount } = data;

        document.getElementById('result').innerText = 
            `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } 
    catch (error) 
    {
        console.error('Error:', error);
        document.getElementById('result').innerText = 'Error converting currency';
    }
});

const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const currency1Select = document.getElementById('currency1');
const currency2Select = document.getElementById('currency2');
const finalCurrencySelect = document.getElementById('final-currency');
const resultContainer = document.getElementById('results-container')

document.getElementById('calculate-btn').addEventListener('click', async () => {

    const amount1 = document.getElementById('amount1').value;
    const currency1 = currency1Select.value;
    const amount2 = document.getElementById('amount2').value;
    const currency2 = currency2Select.value;
    const finalCurrency = finalCurrencySelect.value;
    const operation = document.getElementById('operation').value;

    try {
        const response = await fetch('http://localhost:2727/currency-converter/calculator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ num1: amount1, firstCurr: currency1, num2: amount2, secondCurr: currency2, finalCurr: finalCurrency, operation }),
        });

        const data = await response.json();
        const resultString = `${amount1} ${currency1} ${operation} ${amount2} ${currency2} = ${data.convertedAmount.toFixed(2)} ${finalCurrency}`;

        const resultElement = document.createElement('div');
        resultElement.textContent = resultString;
        resultContainer.appendChild(resultElement);
        
    } catch (error) {
        console.error('Error:', error);
    }
});
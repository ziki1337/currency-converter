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
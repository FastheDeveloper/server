const express = require('express');
const app = express();

app.get('/loan/:loanAmount/:months', (req, res) => {
    const loanAmount = parseFloat(req.params.loanAmount);
    const months = parseInt(req.params.months);
    const monthlyInterestRate = 0.02;
    const maxMonthlyPayment = 12;

    if (months > maxMonthlyPayment) {
        return res.status(400).json({ error: 'Error: Maximum monthly payment exceeded' });
    }

    const monthlyPayment = loanAmount * (monthlyInterestRate + (monthlyInterestRate / (Math.pow(1 + monthlyInterestRate, months) - 1)));
    const totalPayment = monthlyPayment * months;

    res.json({
        monthlyPayment: monthlyPayment,
        totalPayment: totalPayment
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});

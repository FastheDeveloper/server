const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url.startsWith("/loan")){
        let params = req.url.split("/");
        const loanAmount = parseFloat(params[2]);
        const months = parseInt(params[3]);
        const monthlyInterestRate = 0.02;
        const maxMonthlyPayment = 12;
    
        if (months > maxMonthlyPayment) {
            return res.status(400).json({ error: 'Error: Maximum monthly payment exceeded' });
        }
    
        const monthlyPayment = loanAmount * (monthlyInterestRate + (monthlyInterestRate / (Math.pow(1 + monthlyInterestRate, months) - 1)));
        const totalPayment = monthlyPayment * months;
    
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            monthlyPayment: monthlyPayment,
            totalPayment: totalPayment
        }));
    }else{
        res.end("Invalid Request")
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});

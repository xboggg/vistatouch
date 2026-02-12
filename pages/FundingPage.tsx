
import React, { useState, useMemo } from 'react';

const fundingOptions = [
    { title: '5% Deposit + 5% Developer Contribution', audience: 'Public Sector Workers', details: 'Benefit from a combined 10% towards your home. T&Cs apply.', special: true },
    { title: '10% Developer Contribution', audience: 'Public Sector Workers', details: 'A significant boost to your purchasing power. T&Cs apply.', special: true },
    { title: '10% Deposit', audience: 'First-Time Buyers (Non-Public Sector)', details: 'A straightforward path to getting on the property ladder.' },
    { title: '20% Deposit', audience: 'Second-Time Homeowners', details: 'Leverage your equity for your next property move.' },
];

const FundingPage: React.FC = () => {
    const [loanAmount, setLoanAmount] = useState(500000);
    const [interestRate, setInterestRate] = useState(18);
    const [loanTerm, setLoanTerm] = useState(20);

    const monthlyPayment = useMemo(() => {
        if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) return 0;
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;
        const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        return payment;
    }, [loanAmount, interestRate, loanTerm]);
    
    return (
        <div className="bg-light-gray">
            {/* Page Header */}
            <section className="bg-primary text-white py-12 text-center">
                <h1 className="text-4xl font-bold">Funding Your Dream Home</h1>
                <p className="mt-2 text-lg">We provide flexible options to make homeownership a reality.</p>
            </section>

            {/* Funding Options Cards */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary text-center mb-12">Our Funding Packages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {fundingOptions.map(option => (
                            <div key={option.title} className={`p-8 rounded-lg shadow-lg ${option.special ? 'bg-primary text-white' : 'bg-white'}`}>
                                <h3 className={`text-2xl font-bold ${option.special ? 'text-accent' : 'text-primary'}`}>{option.title}</h3>
                                <p className={`mt-2 font-semibold ${option.special ? 'text-gray-300' : 'text-gray-500'}`}>{option.audience}</p>
                                <p className={`mt-4 ${option.special ? 'text-gray-200' : 'text-gray-600'}`}>{option.details}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mortgage Calculator */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-primary text-center mb-12">Mortgage Calculator</h2>
                    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto bg-light-gray p-8 rounded-lg shadow-inner">
                        <div className="space-y-6">
                             <div>
                                <label className="block font-medium text-gray-700">Property Price / Loan Amount (GH₵)</label>
                                <input type="number" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="w-full mt-1 p-3 border rounded-md bg-white text-text-dark" />
                            </div>
                             <div>
                                <label className="block font-medium text-gray-700">Interest Rate (%)</label>
                                <input type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full mt-1 p-3 border rounded-md bg-white text-text-dark" />
                            </div>
                             <div>
                                <label className="block font-medium text-gray-700">Loan Term (Years)</label>
                                <input type="number" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} className="w-full mt-1 p-3 border rounded-md bg-white text-text-dark" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-primary text-white p-8 rounded-lg">
                             <h3 className="text-lg text-gray-300">Estimated Monthly Payment</h3>
                             <p className="text-5xl font-bold text-accent my-4">GH₵ {monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                             <p className="text-sm text-center text-gray-400">This is an estimate and does not constitute a formal quote. Rates may vary.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Inquiry Form */}
            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 max-w-2xl">
                    <h2 className="text-3xl font-bold text-center mb-8">Get a Personalized Quote</h2>
                    <p className="text-center mb-8 text-gray-300">Our financial advisors are ready to help you find the best funding solution.</p>
                    <form className="space-y-4">
                        <input type="text" placeholder="Full Name" className="w-full p-3 rounded-md text-text-dark bg-white" />
                        <input type="email" placeholder="Email Address" className="w-full p-3 rounded-md text-text-dark bg-white" />
                        <input type="tel" placeholder="Phone Number" className="w-full p-3 rounded-md text-text-dark bg-white" />
                         <select className="w-full p-3 rounded-md text-text-dark bg-white">
                            <option>I am interested in...</option>
                            <option>Public Sector Packages</option>
                            <option>First-Time Buyer Options</option>
                            <option>General Mortgage Advice</option>
                        </select>
                        <button type="submit" className="w-full bg-accent text-white p-3 rounded-md font-bold hover:bg-yellow-600 transition-colors">Request a Callback</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default FundingPage;

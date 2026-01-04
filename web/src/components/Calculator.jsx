import { useState } from 'react'
import './Calculator.css'

export default function Calculator() {
  const [propertyPrice, setPropertyPrice] = useState(10000000)
  const [downPayment, setDownPayment] = useState(2000000)
  const [loanTerm, setLoanTerm] = useState(20)
  const [interestRate, setInterestRate] = useState(12)

  const loanAmount = propertyPrice - downPayment
  
  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    
    if (monthlyRate === 0) {
      return loanAmount / numberOfPayments
    }
    
    const payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    return payment
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalPayment = monthlyPayment * loanTerm * 12
  const totalInterest = totalPayment - loanAmount

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)} млн ₽`
    }
    return `${Math.round(price).toLocaleString('ru-RU')} ₽`
  }

  const quickPrices = [
    { label: 'До 10 млн', min: 0, max: 10000000 },
    { label: '10-20 млн', min: 10000000, max: 20000000 },
    { label: '20-50 млн', min: 20000000, max: 50000000 },
    { label: '50+ млн', min: 50000000, max: 100000000 }
  ]

  return (
    <div className="calculator">
      <div className="container">
        <nav className="breadcrumb-nav">
          <button onClick={() => onNavigate && onNavigate('home')} className="breadcrumb-link">
            Главная
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">Калькулятор ипотеки</span>
        </nav>
        <h2 className="calculator-title">Калькулятор ипотеки</h2>
        
        {/* Result Card */}
        <div className="calculator-result">
          <div className="result-main">
            <div className="result-label">Ежемесячный платёж</div>
            <div className="result-value">{Math.round(monthlyPayment).toLocaleString('ru-RU')} ₽</div>
          </div>
          <div className="result-secondary">
            <div className="result-item">
              <span className="result-item-label">Сумма кредита</span>
              <span className="result-item-value">{formatPrice(loanAmount)}</span>
            </div>
            <div className="result-item">
              <span className="result-item-label">Переплата</span>
              <span className="result-item-value" style={{ color: 'var(--primary-orange)' }}>
                {formatPrice(totalInterest)}
              </span>
            </div>
          </div>
        </div>

        {/* Parameters */}
        <div className="calculator-params">
          {/* Property Price */}
          <div className="param-section">
            <div className="param-header">
              <span className="param-icon">🏠</span>
              <span className="param-label">Стоимость недвижимости</span>
              <span className="param-value">{formatPrice(propertyPrice)}</span>
            </div>
            <input
              type="range"
              min="1000000"
              max="100000000"
              step="500000"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="param-slider"
            />
            <div className="quick-buttons">
              {quickPrices.map((item, index) => (
                <button
                  key={index}
                  className="quick-btn"
                  onClick={() => {
                    setPropertyPrice(item.max)
                    setDownPayment(item.max * 0.2)
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Down Payment */}
          <div className="param-section">
            <div className="param-header">
              <span className="param-icon">💰</span>
              <span className="param-label">Первоначальный взнос</span>
              <span className="param-value">
                {formatPrice(downPayment)} ({Math.round((downPayment / propertyPrice) * 100)}%)
              </span>
            </div>
            <input
              type="range"
              min={propertyPrice * 0.1}
              max={propertyPrice * 0.9}
              step="100000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="param-slider"
            />
          </div>

          {/* Loan Term */}
          <div className="param-section">
            <div className="param-header">
              <span className="param-icon">📅</span>
              <span className="param-label">Срок кредита</span>
              <span className="param-value">{loanTerm} лет</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="param-slider"
            />
          </div>

          {/* Interest Rate */}
          <div className="param-section">
            <div className="param-header">
              <span className="param-icon">📈</span>
              <span className="param-label">Процентная ставка</span>
              <span className="param-value">{interestRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="param-slider"
            />
          </div>
        </div>

        {/* Breakdown */}
        <div className="calculator-breakdown">
          <h3>Детализация платежей</h3>
          <div className="breakdown-list">
            <div className="breakdown-item">
              <span>Стоимость недвижимости</span>
              <span>{formatPrice(propertyPrice)}</span>
            </div>
            <div className="breakdown-item">
              <span>Первоначальный взнос</span>
              <span style={{ color: 'var(--primary-green)' }}>{formatPrice(downPayment)}</span>
            </div>
            <div className="breakdown-item">
              <span>Сумма кредита</span>
              <span style={{ color: 'var(--primary-blue)' }}>{formatPrice(loanAmount)}</span>
            </div>
            <div className="breakdown-item">
              <span>Процентная ставка</span>
              <span>{interestRate.toFixed(1)}%</span>
            </div>
            <div className="breakdown-item">
              <span>Срок кредита</span>
              <span>{loanTerm} лет</span>
            </div>
            <div className="breakdown-divider" />
            <div className="breakdown-item breakdown-total">
              <span>Общая сумма выплат</span>
              <span>{formatPrice(totalPayment)}</span>
            </div>
            <div className="breakdown-item breakdown-total">
              <span>Переплата по кредиту</span>
              <span style={{ color: 'var(--error)' }}>{formatPrice(totalInterest)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


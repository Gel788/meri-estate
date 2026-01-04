//
//  CalculatorView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI
import Charts

struct CalculatorView: View {
    @State private var propertyPrice: Double = 10_000_000
    @State private var downPayment: Double = 2_000_000
    @State private var loanTerm: Double = 20
    @State private var interestRate: Double = 12.0
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Results Card
                    resultsCard
                    
                    // Input Parameters
                    VStack(spacing: 20) {
                        // Property Price
                        parameterSection(
                            title: "Стоимость недвижимости",
                            value: $propertyPrice,
                            range: 1_000_000...100_000_000,
                            step: 500_000,
                            formatter: .currency
                        )
                        
                        Divider()
                        
                        // Down Payment
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Text("Первоначальный взнос")
                                    .font(.headline)
                                Spacer()
                                Text(formatCurrency(downPayment))
                                    .font(.headline)
                                    .foregroundColor(.blue)
                            }
                            
                            Text("\(Int((downPayment / propertyPrice) * 100))%")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                            
                            Slider(value: $downPayment, in: propertyPrice * 0.1...propertyPrice * 0.9, step: 100_000)
                                .tint(.blue)
                        }
                        
                        Divider()
                        
                        // Loan Term
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Text("Срок кредита")
                                    .font(.headline)
                                Spacer()
                                Text("\(Int(loanTerm)) лет")
                                    .font(.headline)
                                    .foregroundColor(.blue)
                            }
                            
                            Slider(value: $loanTerm, in: 1...30, step: 1)
                                .tint(.blue)
                            
                            HStack {
                                Text("1 год")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("30 лет")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                        
                        Divider()
                        
                        // Interest Rate
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Text("Процентная ставка")
                                    .font(.headline)
                                Spacer()
                                Text(String(format: "%.1f%%", interestRate))
                                    .font(.headline)
                                    .foregroundColor(.blue)
                            }
                            
                            Slider(value: $interestRate, in: 5.0...25.0, step: 0.1)
                                .tint(.blue)
                            
                            HStack {
                                Text("5%")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Spacer()
                                Text("25%")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                    .padding()
                    .background(Color(.systemBackground))
                    .cornerRadius(16)
                    .shadow(color: Color.black.opacity(0.05), radius: 5, x: 0, y: 2)
                    
                    // Payment Breakdown
                    paymentBreakdown
                    
                    // Chart
                    paymentChart
                }
                .padding()
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Meri Movs")
            .navigationBarTitleDisplayMode(.large)
        }
    }
    
    private var loanAmount: Double {
        propertyPrice - downPayment
    }
    
    private var monthlyPayment: Double {
        let monthlyRate = interestRate / 100 / 12
        let numberOfPayments = loanTerm * 12
        
        if monthlyRate == 0 {
            return loanAmount / numberOfPayments
        }
        
        let payment = loanAmount * (monthlyRate * pow(1 + monthlyRate, numberOfPayments)) / (pow(1 + monthlyRate, numberOfPayments) - 1)
        return payment
    }
    
    private var totalPayment: Double {
        monthlyPayment * loanTerm * 12
    }
    
    private var totalInterest: Double {
        totalPayment - loanAmount
    }
    
    private var resultsCard: some View {
        VStack(spacing: 20) {
            VStack(spacing: 8) {
                Text("Ежемесячный платёж")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                Text(formatCurrency(monthlyPayment))
                    .font(.system(size: 40, weight: .bold))
                    .foregroundColor(.blue)
            }
            
            HStack(spacing: 20) {
                ResultItem(
                    title: "Сумма кредита",
                    value: formatCurrency(loanAmount),
                    color: .blue
                )
                
                ResultItem(
                    title: "Переплата",
                    value: formatCurrency(totalInterest),
                    color: .orange
                )
            }
        }
        .padding()
        .background(
            LinearGradient(
                gradient: Gradient(colors: [Color.blue.opacity(0.1), Color.purple.opacity(0.1)]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
        .cornerRadius(20)
        .shadow(color: Color.black.opacity(0.05), radius: 10, x: 0, y: 5)
    }
    
    private var paymentBreakdown: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Детализация платежей")
                .font(.headline)
            
            VStack(spacing: 12) {
                BreakdownRow(
                    title: "Стоимость недвижимости",
                    value: formatCurrency(propertyPrice),
                    color: .primary
                )
                
                BreakdownRow(
                    title: "Первоначальный взнос",
                    value: formatCurrency(downPayment),
                    color: .green
                )
                
                BreakdownRow(
                    title: "Сумма кредита",
                    value: formatCurrency(loanAmount),
                    color: .blue
                )
                
                BreakdownRow(
                    title: "Процентная ставка",
                    value: String(format: "%.1f%%", interestRate),
                    color: .orange
                )
                
                BreakdownRow(
                    title: "Срок кредита",
                    value: "\(Int(loanTerm)) лет",
                    color: .purple
                )
                
                Divider()
                
                BreakdownRow(
                    title: "Общая сумма выплат",
                    value: formatCurrency(totalPayment),
                    color: .primary,
                    bold: true
                )
                
                BreakdownRow(
                    title: "Переплата по кредиту",
                    value: formatCurrency(totalInterest),
                    color: .red,
                    bold: true
                )
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: Color.black.opacity(0.05), radius: 5, x: 0, y: 2)
    }
    
    private var paymentChart: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("График платежей")
                .font(.headline)
            
            Chart {
                BarMark(
                    x: .value("Type", "Основной долг"),
                    y: .value("Amount", loanAmount)
                )
                .foregroundStyle(Color.blue.gradient)
                
                BarMark(
                    x: .value("Type", "Проценты"),
                    y: .value("Amount", totalInterest)
                )
                .foregroundStyle(Color.orange.gradient)
            }
            .frame(height: 200)
            .chartYAxis {
                AxisMarks(position: .leading)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: Color.black.opacity(0.05), radius: 5, x: 0, y: 2)
    }
    
    private func parameterSection(
        title: String,
        value: Binding<Double>,
        range: ClosedRange<Double>,
        step: Double,
        formatter: FormatterType
    ) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(title)
                    .font(.headline)
                Spacer()
                Text(format(value.wrappedValue, type: formatter))
                    .font(.headline)
                    .foregroundColor(.blue)
            }
            
            Slider(value: value, in: range, step: step)
                .tint(.blue)
        }
    }
    
    enum FormatterType {
        case currency
        case percentage
        case years
    }
    
    private func format(_ value: Double, type: FormatterType) -> String {
        switch type {
        case .currency:
            return formatCurrency(value)
        case .percentage:
            return String(format: "%.1f%%", value)
        case .years:
            return "\(Int(value)) лет"
        }
    }
    
    private func formatCurrency(_ value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.groupingSeparator = " "
        formatter.maximumFractionDigits = 0
        
        if let formatted = formatter.string(from: NSNumber(value: value)) {
            return "\(formatted) ₽"
        }
        return "\(Int(value)) ₽"
    }
}

struct ResultItem: View {
    let title: String
    let value: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 8) {
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
            
            Text(value)
                .font(.headline)
                .foregroundColor(color)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
    }
}

struct BreakdownRow: View {
    let title: String
    let value: String
    let color: Color
    var bold: Bool = false
    
    var body: some View {
        HStack {
            Text(title)
                .font(bold ? .headline : .subheadline)
                .foregroundColor(bold ? .primary : .secondary)
            
            Spacer()
            
            Text(value)
                .font(bold ? .headline : .subheadline)
                .foregroundColor(color)
                .fontWeight(bold ? .bold : .regular)
        }
    }
}

#Preview {
    MainTabView()
}


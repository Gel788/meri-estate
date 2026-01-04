//
//  FilterView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct FilterView: View {
    @EnvironmentObject var viewModel: PropertyViewModel
    @Environment(\.dismiss) var dismiss
    
    @State private var propertyType: PropertyType?
    @State private var status: PropertyStatus?
    @State private var minPrice: Double = 0
    @State private var maxPrice: Double = 200_000_000
    @State private var minArea: Double = 0
    @State private var maxArea: Double = 1000
    @State private var rooms: Int = 0
    @State private var selectedCity: String = ""
    
    let cities = ["Москва", "Московская область", "Санкт-Петербург"]
    
    var activeFiltersCount: Int {
        var count = 0
        if propertyType != nil { count += 1 }
        if status != nil { count += 1 }
        if minPrice > 0 || maxPrice < 200_000_000 { count += 1 }
        if minArea > 0 || maxArea < 1000 { count += 1 }
        if rooms > 0 { count += 1 }
        if !selectedCity.isEmpty { count += 1 }
        return count
    }
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header Stats
                    if activeFiltersCount > 0 {
                        HStack(spacing: 12) {
                            Image(systemName: "slider.horizontal.3")
                                .font(.title3)
                                .foregroundColor(.blue)
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Активных фильтров")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                Text("\(activeFiltersCount)")
                                    .font(.title2)
                                    .fontWeight(.bold)
                                    .foregroundColor(.blue)
                            }
                            
                            Spacer()
                            
                            Button {
                                resetFilters()
                            } label: {
                                HStack(spacing: 4) {
                                    Image(systemName: "xmark.circle.fill")
                                    Text("Сбросить")
                                }
                                .font(.subheadline)
                                .foregroundColor(.red)
                                .padding(.horizontal, 12)
                                .padding(.vertical, 6)
                                .background(Color.red.opacity(0.1))
                                .cornerRadius(20)
                            }
                        }
                        .padding()
                        .background(Color.blue.opacity(0.05))
                        .cornerRadius(16)
                        .padding(.horizontal)
                        .padding(.top)
                    }
                    
                    VStack(spacing: 20) {
                        // Property Type
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Image(systemName: "building.2.fill")
                                    .foregroundColor(.blue)
                                Text("Тип недвижимости")
                                    .font(.headline)
                            }
                            
                            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                                ForEach(PropertyType.allCases, id: \.self) { type in
                                    FilterTypeCard(
                                        icon: getPropertyIcon(type),
                                        title: type.rawValue,
                                        isSelected: propertyType == type
                                    ) {
                                        withAnimation(.spring(response: 0.3)) {
                                            propertyType = propertyType == type ? nil : type
                                        }
                                    }
                                }
                            }
                        }
                        .padding()
                        .background(Color(.systemBackground))
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.05), radius: 5)
                
                        // Status
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Image(systemName: "tag.fill")
                                    .foregroundColor(.green)
                                Text("Статус")
                                    .font(.headline)
                            }
                            
                            HStack(spacing: 12) {
                                FilterStatusCard(
                                    icon: "dollarsign.circle.fill",
                                    title: "Продажа",
                                    color: .blue,
                                    isSelected: status == .sale
                                ) {
                                    withAnimation(.spring(response: 0.3)) {
                                        status = status == .sale ? nil : .sale
                                    }
                                }
                                
                                FilterStatusCard(
                                    icon: "key.fill",
                                    title: "Аренда",
                                    color: .green,
                                    isSelected: status == .rent
                                ) {
                                    withAnimation(.spring(response: 0.3)) {
                                        status = status == .rent ? nil : .rent
                                    }
                                }
                            }
                        }
                        .padding()
                        .background(Color(.systemBackground))
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.05), radius: 5)
                
                        // Price Range
                        VStack(alignment: .leading, spacing: 16) {
                            HStack {
                                Image(systemName: "rublesign.circle.fill")
                                    .foregroundColor(.orange)
                                Text("Цена")
                                    .font(.headline)
                            }
                            
                            VStack(spacing: 16) {
                                // Display
                                HStack {
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text("От")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                        Text(formatPriceShort(minPrice))
                                            .font(.title3)
                                            .fontWeight(.bold)
                                            .foregroundColor(.orange)
                                    }
                                    
                                    Spacer()
                                    
                                    VStack(alignment: .trailing, spacing: 4) {
                                        Text("До")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                        Text(formatPriceShort(maxPrice))
                                            .font(.title3)
                                            .fontWeight(.bold)
                                            .foregroundColor(.orange)
                                    }
                                }
                                
                                // Slider
                                VStack(spacing: 8) {
                                    // Min Price Slider
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text("Минимальная цена")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                        
                                        Slider(value: $minPrice, in: 0...200_000_000, step: 1_000_000)
                                            .tint(.orange)
                                    }
                                    
                                    // Max Price Slider
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text("Максимальная цена")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                        
                                        Slider(value: $maxPrice, in: minPrice...200_000_000, step: 1_000_000)
                                            .tint(.orange)
                                    }
                                }
                                
                                // Quick price buttons
                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(spacing: 8) {
                                        QuickPriceButton(title: "До 10 млн", icon: "1.circle.fill") {
                                            minPrice = 0
                                            maxPrice = 10_000_000
                                        }
                                        QuickPriceButton(title: "10-20 млн", icon: "2.circle.fill") {
                                            minPrice = 10_000_000
                                            maxPrice = 20_000_000
                                        }
                                        QuickPriceButton(title: "20-50 млн", icon: "3.circle.fill") {
                                            minPrice = 20_000_000
                                            maxPrice = 50_000_000
                                        }
                                        QuickPriceButton(title: "50+ млн", icon: "infinity.circle.fill") {
                                            minPrice = 50_000_000
                                            maxPrice = 200_000_000
                                        }
                                    }
                                }
                            }
                        }
                        .padding()
                        .background(Color(.systemBackground))
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.05), radius: 5)
                
                        // Area Range
                        VStack(alignment: .leading, spacing: 16) {
                            HStack {
                                Image(systemName: "square.fill")
                                    .foregroundColor(.purple)
                                Text("Площадь")
                                    .font(.headline)
                            }
                            
                            VStack(spacing: 16) {
                                // Display
                                HStack {
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text("От")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                        Text("\(Int(minArea)) м²")
                                            .font(.title3)
                                            .fontWeight(.bold)
                                            .foregroundColor(.purple)
                                    }
                                    
                                    Spacer()
                                    
                                    VStack(alignment: .trailing, spacing: 4) {
                                        Text("До")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                        Text("\(Int(maxArea)) м²")
                                            .font(.title3)
                                            .fontWeight(.bold)
                                            .foregroundColor(.purple)
                                    }
                                }
                                
                                // Slider
                                VStack(spacing: 8) {
                                    // Min Area Slider
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text("Минимальная площадь")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                        
                                        Slider(value: $minArea, in: 0...1000, step: 10)
                                            .tint(.purple)
                                    }
                                    
                                    // Max Area Slider
                                    VStack(alignment: .leading, spacing: 4) {
                                        Text("Максимальная площадь")
                                            .font(.caption)
                                            .foregroundColor(.secondary)
                                        
                                        Slider(value: $maxArea, in: minArea...1000, step: 10)
                                            .tint(.purple)
                                    }
                                }
                                
                                // Quick area buttons
                                ScrollView(.horizontal, showsIndicators: false) {
                                    HStack(spacing: 8) {
                                        QuickAreaButton(title: "До 50 м²", icon: "s.circle.fill") {
                                            minArea = 0
                                            maxArea = 50
                                        }
                                        QuickAreaButton(title: "50-100 м²", icon: "m.circle.fill") {
                                            minArea = 50
                                            maxArea = 100
                                        }
                                        QuickAreaButton(title: "100-200 м²", icon: "l.circle.fill") {
                                            minArea = 100
                                            maxArea = 200
                                        }
                                        QuickAreaButton(title: "200+ м²", icon: "xmark.circle.fill") {
                                            minArea = 200
                                            maxArea = 1000
                                        }
                                    }
                                }
                            }
                        }
                        .padding()
                        .background(Color(.systemBackground))
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.05), radius: 5)
                
                        // Rooms
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Image(systemName: "bed.double.fill")
                                    .foregroundColor(.red)
                                Text("Количество комнат")
                                    .font(.headline)
                            }
                            
                            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                                ForEach(0...6, id: \.self) { count in
                                    RoomButton(
                                        count: count,
                                        isSelected: rooms == count
                                    ) {
                                        withAnimation(.spring(response: 0.3)) {
                                            rooms = count
                                        }
                                    }
                                }
                            }
                        }
                        .padding()
                        .background(Color(.systemBackground))
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.05), radius: 5)
                
                        // City
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Image(systemName: "location.fill")
                                    .foregroundColor(.blue)
                                Text("Город")
                                    .font(.headline)
                            }
                            
                            VStack(spacing: 8) {
                                CityButton(
                                    title: "Все города",
                                    icon: "globe",
                                    isSelected: selectedCity.isEmpty
                                ) {
                                    selectedCity = ""
                                }
                                
                                ForEach(cities, id: \.self) { city in
                                    CityButton(
                                        title: city,
                                        icon: "location.circle.fill",
                                        isSelected: selectedCity == city
                                    ) {
                                        selectedCity = city
                                    }
                                }
                            }
                        }
                        .padding()
                        .background(Color(.systemBackground))
                        .cornerRadius(16)
                        .shadow(color: Color.black.opacity(0.05), radius: 5)
                    }
                    .padding(.horizontal)
                    .padding(.bottom, 100)
                }
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Фильтры")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        dismiss()
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundColor(.secondary)
                            .font(.title3)
                    }
                }
            }
            .overlay(alignment: .bottom) {
                applyButton
            }
            .onAppear {
                loadCurrentFilters()
            }
        }
    }
    
    private var applyButton: some View {
        Button {
            applyFilters()
            dismiss()
        } label: {
            HStack {
                Image(systemName: "checkmark.circle.fill")
                Text("Показать результаты")
                    .fontWeight(.semibold)
            }
            .foregroundColor(.white)
            .frame(maxWidth: .infinity)
            .padding()
            .background(
                LinearGradient(
                    colors: [.blue, .purple],
                    startPoint: .leading,
                    endPoint: .trailing
                )
            )
            .cornerRadius(16)
        }
        .padding()
        .background(Color(.systemBackground))
        .shadow(color: Color.black.opacity(0.1), radius: 10, y: -5)
    }
    
    private func getPropertyIcon(_ type: PropertyType) -> String {
        switch type {
        case .apartment: return "building.2.fill"
        case .house: return "house.fill"
        case .studio: return "square.grid.2x2.fill"
        case .penthouse: return "building.fill"
        case .villa: return "house.and.flag.fill"
        case .land: return "map.fill"
        }
    }
    
    private func loadCurrentFilters() {
        propertyType = viewModel.filter.propertyType
        status = viewModel.filter.status
        minPrice = viewModel.filter.minPrice ?? 0
        maxPrice = viewModel.filter.maxPrice ?? 200_000_000
        minArea = viewModel.filter.minArea ?? 0
        maxArea = viewModel.filter.maxArea ?? 1000
        rooms = viewModel.filter.rooms ?? 0
        selectedCity = viewModel.filter.city ?? ""
    }
    
    private func applyFilters() {
        viewModel.filter.propertyType = propertyType
        viewModel.filter.status = status
        viewModel.filter.minPrice = minPrice > 0 ? minPrice : nil
        viewModel.filter.maxPrice = maxPrice < 200_000_000 ? maxPrice : nil
        viewModel.filter.minArea = minArea > 0 ? minArea : nil
        viewModel.filter.maxArea = maxArea < 1000 ? maxArea : nil
        viewModel.filter.rooms = rooms > 0 ? rooms : nil
        viewModel.filter.city = selectedCity.isEmpty ? nil : selectedCity
    }
    
    private func resetFilters() {
        propertyType = nil
        status = nil
        minPrice = 0
        maxPrice = 200_000_000
        minArea = 0
        maxArea = 1000
        rooms = 0
        selectedCity = ""
        viewModel.filter = PropertyFilter()
    }
    
    private func formatPrice(_ price: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.groupingSeparator = " "
        formatter.maximumFractionDigits = 0
        
        if let formatted = formatter.string(from: NSNumber(value: price)) {
            return "\(formatted) ₽"
        }
        return "\(Int(price)) ₽"
    }
    
    private func formatPriceShort(_ price: Double) -> String {
        if price == 0 {
            return "0 ₽"
        }
        if price >= 1_000_000 {
            let millions = price / 1_000_000
            if millions >= 100 {
                return "\(Int(millions)) млн ₽"
            }
            return String(format: "%.1f млн ₽", millions)
        }
        return "\(Int(price / 1000)) тыс ₽"
    }
}

// Filter Components

struct FilterTypeCard: View {
    let icon: String
    let title: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Image(systemName: icon)
                    .font(.title2)
                    .foregroundColor(isSelected ? .white : .blue)
                
                Text(title)
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(isSelected ? .white : .primary)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 16)
            .background(isSelected ? Color.blue : Color(.systemGray6))
            .cornerRadius(12)
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(isSelected ? Color.blue : Color.clear, lineWidth: 2)
            )
        }
    }
}

struct FilterStatusCard: View {
    let icon: String
    let title: String
    let color: Color
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Image(systemName: icon)
                    .font(.title3)
                    .foregroundColor(isSelected ? .white : color)
                
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .foregroundColor(isSelected ? .white : .primary)
                
                Spacer()
                
                if isSelected {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(.white)
                }
            }
            .padding()
            .background(isSelected ? color : Color(.systemGray6))
            .cornerRadius(12)
        }
    }
}

struct QuickPriceButton: View {
    let title: String
    let icon: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.caption)
                Text(title)
                    .font(.caption)
                    .fontWeight(.medium)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(Color.orange.opacity(0.15))
            .foregroundColor(.orange)
            .cornerRadius(20)
        }
    }
}

struct QuickAreaButton: View {
    let title: String
    let icon: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 4) {
                Image(systemName: icon)
                    .font(.caption)
                Text(title)
                    .font(.caption)
                    .fontWeight(.medium)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(Color.purple.opacity(0.15))
            .foregroundColor(.purple)
            .cornerRadius(20)
        }
    }
}

struct RoomButton: View {
    let count: Int
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                if count == 0 {
                    Image(systemName: "infinity")
                        .font(.title3)
                } else {
                    Text("\(count)")
                        .font(.title3)
                        .fontWeight(.bold)
                }
                
                Text(count == 0 ? "Любое" : "комн.")
                    .font(.caption2)
            }
            .foregroundColor(isSelected ? .white : .primary)
            .frame(maxWidth: .infinity)
            .padding(.vertical, 12)
            .background(isSelected ? Color.red : Color(.systemGray6))
            .cornerRadius(12)
        }
    }
}

struct CityButton: View {
    let title: String
    let icon: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 12) {
                Image(systemName: icon)
                    .foregroundColor(isSelected ? .white : .blue)
                
                Text(title)
                    .font(.subheadline)
                    .fontWeight(.medium)
                    .foregroundColor(isSelected ? .white : .primary)
                
                Spacer()
                
                if isSelected {
                    Image(systemName: "checkmark.circle.fill")
                        .foregroundColor(.white)
                }
            }
            .padding()
            .background(isSelected ? Color.blue : Color(.systemGray6))
            .cornerRadius(12)
        }
    }
}

#Preview {
    FilterView()
        .environmentObject(PropertyViewModel())
}


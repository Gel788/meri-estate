//
//  PropertyCard.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct PropertyCard: View {
    let property: Property
    @EnvironmentObject var viewModel: PropertyViewModel
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // Image
            ZStack(alignment: .topTrailing) {
                PropertyImageView(
                    imageIndex: abs(property.id.hashValue % 8),
                    propertyType: property.propertyType,
                    height: 200
                )
                .frame(maxWidth: .infinity)
                .clipped()
                
                // Badges
                VStack(alignment: .trailing, spacing: 8) {
                    if property.isNew {
                        Badge(text: "Новое", color: .green)
                    }
                    
                    if property.isFeatured {
                        Badge(text: "★", color: .orange)
                    }
                    
                    Button {
                        viewModel.toggleFavorite(property)
                    } label: {
                        Image(systemName: viewModel.isFavorite(property) ? "heart.fill" : "heart")
                            .foregroundColor(viewModel.isFavorite(property) ? .red : .white)
                            .padding(8)
                            .background(Color.black.opacity(0.3))
                            .clipShape(Circle())
                    }
                }
                .padding(12)
            }
            
            // Info
            VStack(alignment: .leading, spacing: 12) {
                VStack(alignment: .leading, spacing: 4) {
                    Text(property.title)
                        .font(.headline)
                        .foregroundColor(.primary)
                        .lineLimit(2)
                    
                    HStack(spacing: 4) {
                        Image(systemName: "location.fill")
                            .font(.caption)
                        Text(property.address)
                            .font(.subheadline)
                    }
                    .foregroundColor(.secondary)
                }
                
                // Stats
                HStack(spacing: 16) {
                    StatItem(icon: "bed.double.fill", value: "\(property.rooms)")
                    StatItem(icon: "shower.fill", value: "\(property.bathrooms)")
                    StatItem(icon: "square.fill", value: "\(Int(property.area)) м²")
                }
                
                Divider()
                
                // Price and Type
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(formatPrice(property.price))
                            .font(.title3)
                            .fontWeight(.bold)
                            .foregroundColor(.blue)
                        
                        Text("\(Int(property.pricePerMeter)) ₽/м²")
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                    
                    Spacer()
                    
                    Text(property.propertyType.rawValue)
                        .font(.caption)
                        .fontWeight(.semibold)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color.blue.opacity(0.1))
                        .foregroundColor(.blue)
                        .cornerRadius(12)
                }
            }
            .padding(16)
        }
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: Color.black.opacity(0.08), radius: 8, x: 0, y: 4)
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
}

struct StatItem: View {
    let icon: String
    let value: String
    
    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: icon)
                .font(.caption)
                .foregroundColor(.secondary)
            Text(value)
                .font(.caption)
                .foregroundColor(.secondary)
        }
    }
}

struct Badge: View {
    let text: String
    let color: Color
    
    var body: some View {
        Text(text)
            .font(.caption)
            .fontWeight(.semibold)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(color)
            .foregroundColor(.white)
            .cornerRadius(8)
    }
}

#Preview {
    PropertyCard(property: Property(
        title: "Роскошная квартира",
        address: "ул. Тверская, 15",
        city: "Москва",
        price: 25000000,
        area: 120,
        rooms: 3,
        bathrooms: 2,
        floors: 25,
        floor: 18,
        propertyType: .apartment,
        status: .sale,
        description: "Описание",
        features: [],
        images: ["photo"],
        coordinate: Coordinate(latitude: 55.7558, longitude: 37.6173),
        agent: Agent(name: "Анна", photo: "person", phone: "+7", email: "test@test.com"),
        yearBuilt: 2020,
        isNew: true,
        isFeatured: true
    ))
    .environmentObject(PropertyViewModel())
    .padding()
}


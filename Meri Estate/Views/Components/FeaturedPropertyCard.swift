//
//  FeaturedPropertyCard.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct FeaturedPropertyCard: View {
    let property: Property
    
    var body: some View {
        ZStack(alignment: .bottomLeading) {
            // Background Image
            PropertyImageView(
                imageIndex: abs(property.id.hashValue % 8),
                propertyType: property.propertyType,
                width: 300,
                height: 400
            )
            
            // Gradient Overlay
            LinearGradient(
                gradient: Gradient(colors: [Color.clear, Color.black.opacity(0.7)]),
                startPoint: .top,
                endPoint: .bottom
            )
            
            // Content
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Badge(text: property.propertyType.rawValue, color: .blue)
                    if property.isNew {
                        Badge(text: "Новое", color: .green)
                    }
                }
                
                Text(property.title)
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
                    .lineLimit(2)
                
                HStack(spacing: 4) {
                    Image(systemName: "location.fill")
                        .font(.caption)
                    Text(property.address)
                        .font(.subheadline)
                }
                .foregroundColor(.white.opacity(0.9))
                
                HStack(spacing: 12) {
                    HStack(spacing: 4) {
                        Image(systemName: "bed.double.fill")
                            .font(.caption)
                        Text("\(property.rooms)")
                            .font(.caption)
                    }
                    
                    HStack(spacing: 4) {
                        Image(systemName: "shower.fill")
                            .font(.caption)
                        Text("\(property.bathrooms)")
                            .font(.caption)
                    }
                    
                    HStack(spacing: 4) {
                        Image(systemName: "square.fill")
                            .font(.caption)
                        Text("\(Int(property.area)) м²")
                            .font(.caption)
                    }
                }
                .foregroundColor(.white.opacity(0.9))
                
                Text(formatPrice(property.price))
                    .font(.title2)
                    .fontWeight(.bold)
                    .foregroundColor(.white)
            }
            .padding(20)
        }
        .frame(width: 300, height: 400)
        .cornerRadius(20)
        .shadow(color: Color.black.opacity(0.15), radius: 10, x: 0, y: 5)
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

#Preview {
    FeaturedPropertyCard(property: Property(
        title: "Роскошная квартира в центре",
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
    .padding()
}


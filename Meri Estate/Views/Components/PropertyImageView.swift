//
//  PropertyImageView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct PropertyImageView: View {
    let imageIndex: Int
    let propertyType: PropertyType
    let width: CGFloat?
    let height: CGFloat
    
    init(imageIndex: Int, propertyType: PropertyType, width: CGFloat? = nil, height: CGFloat = 200) {
        self.imageIndex = imageIndex
        self.propertyType = propertyType
        self.width = width
        self.height = height
    }
    
    private var gradientColors: [Color] {
        let gradients: [[Color]] = [
            [Color(red: 0.2, green: 0.4, blue: 0.8), Color(red: 0.4, green: 0.6, blue: 1.0)],
            [Color(red: 0.6, green: 0.2, blue: 0.8), Color(red: 0.8, green: 0.4, blue: 1.0)],
            [Color(red: 0.2, green: 0.7, blue: 0.5), Color(red: 0.4, green: 0.9, blue: 0.7)],
            [Color(red: 0.9, green: 0.4, blue: 0.3), Color(red: 1.0, green: 0.6, blue: 0.5)],
            [Color(red: 0.3, green: 0.5, blue: 0.9), Color(red: 0.5, green: 0.7, blue: 1.0)],
            [Color(red: 0.8, green: 0.3, blue: 0.5), Color(red: 1.0, green: 0.5, blue: 0.7)],
            [Color(red: 0.4, green: 0.6, blue: 0.3), Color(red: 0.6, green: 0.8, blue: 0.5)],
            [Color(red: 0.7, green: 0.5, blue: 0.2), Color(red: 0.9, green: 0.7, blue: 0.4)]
        ]
        return gradients[imageIndex % gradients.count]
    }
    
    private var iconName: String {
        switch propertyType {
        case .apartment:
            return ["building.2.fill", "building.fill", "house.fill"][imageIndex % 3]
        case .house:
            return ["house.fill", "house.and.flag.fill", "house.circle.fill"][imageIndex % 3]
        case .studio:
            return ["building.fill", "square.grid.2x2.fill", "rectangle.grid.1x2.fill"][imageIndex % 3]
        case .penthouse:
            return ["building.2.fill", "star.fill", "crown.fill"][imageIndex % 3]
        case .villa:
            return ["house.and.flag.fill", "leaf.fill", "tree.fill"][imageIndex % 3]
        case .land:
            return ["map.fill", "tree.fill", "mountain.2.fill"][imageIndex % 3]
        }
    }
    
    var body: some View {
        ZStack {
            // Gradient Background
            LinearGradient(
                gradient: Gradient(colors: gradientColors),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
            
            // Pattern overlay
            GeometryReader { geometry in
                Path { path in
                    let size = geometry.size
                    let spacing: CGFloat = 30
                    
                    for i in stride(from: 0, to: size.height + size.width, by: spacing) {
                        path.move(to: CGPoint(x: 0, y: i))
                        path.addLine(to: CGPoint(x: i, y: 0))
                    }
                }
                .stroke(Color.white.opacity(0.1), lineWidth: 1)
            }
            
            // Icons decoration
            VStack {
                HStack {
                    Image(systemName: iconName)
                        .font(.system(size: 60))
                        .foregroundColor(.white.opacity(0.15))
                        .rotationEffect(.degrees(-15))
                    Spacer()
                }
                .padding()
                Spacer()
            }
            
            VStack {
                Spacer()
                HStack {
                    Spacer()
                    Image(systemName: iconName)
                        .font(.system(size: 80))
                        .foregroundColor(.white.opacity(0.1))
                        .rotationEffect(.degrees(15))
                }
                .padding()
            }
            
            // Center Icon
            Image(systemName: iconName)
                .font(.system(size: 50))
                .foregroundColor(.white.opacity(0.3))
                .shadow(color: .black.opacity(0.1), radius: 10)
        }
        .frame(width: width, height: height)
    }
}

#Preview {
    VStack(spacing: 20) {
        PropertyImageView(imageIndex: 0, propertyType: .apartment, height: 200)
        PropertyImageView(imageIndex: 1, propertyType: .house, height: 200)
        PropertyImageView(imageIndex: 2, propertyType: .villa, height: 200)
    }
    .padding()
}


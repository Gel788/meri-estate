//
//  PropertyDetailView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI
import MapKit

struct PropertyDetailView: View {
    let property: Property
    @EnvironmentObject var viewModel: PropertyViewModel
    @Environment(\.dismiss) var dismiss
    @State private var currentImageIndex = 0
    @State private var showContactSheet = false
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                // Image Gallery
                imageGallery
                
                // Content
                VStack(alignment: .leading, spacing: 24) {
                    // Header
                    headerSection
                    
                    Divider()
                    
                    // Stats
                    statsSection
                    
                    Divider()
                    
                    // Description
                    descriptionSection
                    
                    Divider()
                    
                    // Features
                    featuresSection
                    
                    Divider()
                    
                    // Location
                    locationSection
                    
                    Divider()
                    
                    // Agent
                    agentSection
                }
                .padding()
            }
        }
        .ignoresSafeArea(edges: .top)
        .navigationBarBackButtonHidden(true)
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button {
                    dismiss()
                } label: {
                    Image(systemName: "chevron.left")
                        .foregroundColor(.white)
                        .padding(8)
                        .background(Color.black.opacity(0.5))
                        .clipShape(Circle())
                }
            }
            
            ToolbarItem(placement: .navigationBarTrailing) {
                Button {
                    viewModel.toggleFavorite(property)
                } label: {
                    Image(systemName: viewModel.isFavorite(property) ? "heart.fill" : "heart")
                        .foregroundColor(viewModel.isFavorite(property) ? .red : .white)
                        .padding(8)
                        .background(Color.black.opacity(0.5))
                        .clipShape(Circle())
                }
            }
        }
        .overlay(alignment: .bottom) {
            contactButton
        }
        .sheet(isPresented: $showContactSheet) {
            ContactAgentView(agent: property.agent)
        }
    }
    
    private var imageGallery: some View {
        ZStack(alignment: .bottom) {
            TabView(selection: $currentImageIndex) {
                ForEach(0..<property.images.count, id: \.self) { index in
                    PropertyImageView(
                        imageIndex: (abs(property.id.hashValue) + index) % 8,
                        propertyType: property.propertyType,
                        height: 400
                    )
                    .frame(maxWidth: .infinity)
                    .tag(index)
                }
            }
            .frame(height: 400)
            .tabViewStyle(.page(indexDisplayMode: .never))
            
            // Custom Page Indicator
            HStack(spacing: 6) {
                ForEach(0..<property.images.count, id: \.self) { index in
                    Circle()
                        .fill(currentImageIndex == index ? Color.white : Color.white.opacity(0.5))
                        .frame(width: 8, height: 8)
                }
            }
            .padding(.bottom, 16)
        }
    }
    
    private var headerSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(property.status.rawValue)
                    .font(.caption)
                    .fontWeight(.semibold)
                    .padding(.horizontal, 12)
                    .padding(.vertical, 6)
                    .background(Color.blue.opacity(0.1))
                    .foregroundColor(.blue)
                    .cornerRadius(12)
                
                if property.isNew {
                    Badge(text: "Новое", color: .green)
                }
                
                Spacer()
                
                HStack(spacing: 4) {
                    Image(systemName: "eye.fill")
                        .font(.caption)
                    Text("\(property.views)")
                        .font(.caption)
                }
                .foregroundColor(.secondary)
            }
            
            Text(property.title)
                .font(.title)
                .fontWeight(.bold)
            
            HStack(spacing: 4) {
                Image(systemName: "location.fill")
                    .font(.subheadline)
                Text("\(property.address), \(property.city)")
                    .font(.subheadline)
            }
            .foregroundColor(.secondary)
            
            HStack(alignment: .bottom, spacing: 4) {
                Text(formatPrice(property.price))
                    .font(.system(size: 32, weight: .bold))
                    .foregroundColor(.blue)
                
                Text("(\(Int(property.pricePerMeter)) ₽/м²)")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .padding(.bottom, 6)
            }
        }
    }
    
    private var statsSection: some View {
        VStack(spacing: 16) {
            HStack(spacing: 20) {
                StatBox(icon: "bed.double.fill", title: "Комнаты", value: "\(property.rooms)")
                StatBox(icon: "shower.fill", title: "Ванные", value: "\(property.bathrooms)")
                StatBox(icon: "square.fill", title: "Площадь", value: "\(Int(property.area)) м²")
            }
            
            HStack(spacing: 20) {
                StatBox(icon: "building.2.fill", title: "Этаж", value: "\(property.floor)/\(property.floors)")
                StatBox(icon: "calendar", title: "Построен", value: "\(property.yearBuilt)")
                StatBox(icon: "star.fill", title: "Рейтинг", value: String(format: "%.1f", property.rating))
            }
        }
    }
    
    private var descriptionSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Описание")
                .font(.title2)
                .fontWeight(.bold)
            
            Text(property.description)
                .font(.body)
                .foregroundColor(.secondary)
                .lineSpacing(6)
        }
    }
    
    private var featuresSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Особенности")
                .font(.title2)
                .fontWeight(.bold)
            
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                ForEach(property.features, id: \.self) { feature in
                    HStack(spacing: 8) {
                        Image(systemName: "checkmark.circle.fill")
                            .foregroundColor(.green)
                            .font(.subheadline)
                        
                        Text(feature)
                            .font(.subheadline)
                            .foregroundColor(.primary)
                        
                        Spacer()
                    }
                    .padding(12)
                    .background(Color(.systemGray6))
                    .cornerRadius(10)
                }
            }
        }
    }
    
    private var locationSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Расположение")
                .font(.title2)
                .fontWeight(.bold)
            
            Map(position: .constant(.region(MKCoordinateRegion(
                center: property.coordinate.clCoordinate,
                span: MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.01)
            )))) {
                Marker(property.title, coordinate: property.coordinate.clCoordinate)
                    .tint(.blue)
            }
            .frame(height: 200)
            .cornerRadius(12)
            .allowsHitTesting(false)
            
            Text(property.address)
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
    }
    
    private var agentSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Агент")
                .font(.title2)
                .fontWeight(.bold)
            
            HStack(spacing: 16) {
                Image(systemName: property.agent.photo)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 60, height: 60)
                    .clipShape(Circle())
                    .foregroundColor(.blue)
                    .background(
                        Circle()
                            .fill(Color.blue.opacity(0.1))
                            .frame(width: 60, height: 60)
                    )
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(property.agent.name)
                        .font(.headline)
                    
                    HStack(spacing: 4) {
                        Image(systemName: "star.fill")
                            .font(.caption)
                            .foregroundColor(.orange)
                        Text(String(format: "%.1f", property.agent.rating))
                            .font(.subheadline)
                        Text("· \(property.agent.experience) лет опыта")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                    
                    Text("\(property.agent.propertiesCount) объектов")
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                Button {
                    showContactSheet = true
                } label: {
                    Image(systemName: "chevron.right")
                        .foregroundColor(.secondary)
                }
            }
            .padding()
            .background(Color(.systemGray6))
            .cornerRadius(12)
        }
        .padding(.bottom, 80)
    }
    
    private var contactButton: some View {
        Button {
            showContactSheet = true
        } label: {
            Text("Связаться с агентом")
                .font(.headline)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.blue)
                .cornerRadius(16)
        }
        .padding()
        .background(Color(.systemBackground))
        .shadow(color: Color.black.opacity(0.1), radius: 10, x: 0, y: -5)
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

struct StatBox: View {
    let icon: String
    let title: String
    let value: String
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(.blue)
            
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
            
            Text(value)
                .font(.subheadline)
                .fontWeight(.semibold)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

#Preview {
    NavigationStack {
        PropertyDetailView(property: Property(
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
            description: "Просторная трёхкомнатная квартира с панорамным видом на центр Москвы.",
            features: ["Панорамные окна", "Паркинг", "Консьерж"],
            images: ["photo", "photo.fill", "photo.circle"],
            coordinate: Coordinate(latitude: 55.7558, longitude: 37.6173),
            agent: Agent(name: "Анна Петрова", photo: "person.circle.fill", phone: "+7", email: "test@test.com"),
            yearBuilt: 2020,
            isNew: true,
            isFeatured: true
        ))
        .environmentObject(PropertyViewModel())
    }
}


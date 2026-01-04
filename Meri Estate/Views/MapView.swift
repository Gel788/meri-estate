//
//  MapView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI
import MapKit

struct MapView: View {
    @EnvironmentObject var viewModel: PropertyViewModel
    @State private var position: MapCameraPosition = .region(MKCoordinateRegion(
        center: CLLocationCoordinate2D(latitude: 55.7558, longitude: 37.6173),
        span: MKCoordinateSpan(latitudeDelta: 0.1, longitudeDelta: 0.1)
    ))
    @State private var selectedProperty: Property?
    @State private var showFilters = false
    
    var body: some View {
        NavigationStack {
            ZStack(alignment: .bottom) {
                Map(position: $position) {
                    ForEach(viewModel.filteredProperties) { property in
                        Annotation(property.title, coordinate: property.coordinate.clCoordinate) {
                            PropertyMarker(property: property)
                                .onTapGesture {
                                    selectedProperty = property
                                    position = .region(MKCoordinateRegion(
                                        center: property.coordinate.clCoordinate,
                                        span: MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.01)
                                    ))
                                }
                        }
                    }
                }
                .mapStyle(.standard(elevation: .realistic))
                
                // Selected Property Card
                if let property = selectedProperty {
                    MapPropertyCard(property: property)
                        .transition(.move(edge: .bottom).combined(with: .opacity))
                        .padding()
                }
            }
            .navigationTitle("Meri Movs")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        showFilters = true
                    } label: {
                        Image(systemName: "slider.horizontal.3")
                            .foregroundColor(.blue)
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        centerOnProperties()
                    } label: {
                        Image(systemName: "location.fill")
                            .foregroundColor(.blue)
                    }
                }
            }
            .sheet(isPresented: $showFilters) {
                FilterView()
                    .environmentObject(viewModel)
            }
        }
    }
    
    private func centerOnProperties() {
        guard !viewModel.filteredProperties.isEmpty else { return }
        
        let coordinates = viewModel.filteredProperties.map { $0.coordinate.clCoordinate }
        let minLat = coordinates.map { $0.latitude }.min() ?? 0
        let maxLat = coordinates.map { $0.latitude }.max() ?? 0
        let minLon = coordinates.map { $0.longitude }.min() ?? 0
        let maxLon = coordinates.map { $0.longitude }.max() ?? 0
        
        let center = CLLocationCoordinate2D(
            latitude: (minLat + maxLat) / 2,
            longitude: (minLon + maxLon) / 2
        )
        
        let span = MKCoordinateSpan(
            latitudeDelta: (maxLat - minLat) * 1.5,
            longitudeDelta: (maxLon - minLon) * 1.5
        )
        
        position = .region(MKCoordinateRegion(center: center, span: span))
    }
}

struct PropertyMarker: View {
    let property: Property
    
    var body: some View {
        VStack(spacing: 0) {
            Text(formatPrice(property.price))
                .font(.caption)
                .fontWeight(.bold)
                .foregroundColor(.white)
                .padding(.horizontal, 8)
                .padding(.vertical, 4)
                .background(Color.blue)
                .cornerRadius(8)
            
            Image(systemName: "arrowtriangle.down.fill")
                .font(.caption)
                .foregroundColor(.blue)
                .offset(y: -2)
        }
    }
    
    private func formatPrice(_ price: Double) -> String {
        if price >= 1_000_000 {
            return String(format: "%.1f млн", price / 1_000_000)
        }
        return "\(Int(price / 1000)) тыс"
    }
}

struct MapPropertyCard: View {
    let property: Property
    @EnvironmentObject var viewModel: PropertyViewModel
    
    var body: some View {
        NavigationLink(destination: PropertyDetailView(property: property).environmentObject(viewModel)) {
            HStack(spacing: 12) {
                // Image
                PropertyImageView(
                    imageIndex: abs(property.id.hashValue % 8),
                    propertyType: property.propertyType,
                    width: 80,
                    height: 80
                )
                .cornerRadius(12)
                
                // Info
                VStack(alignment: .leading, spacing: 4) {
                    Text(property.title)
                        .font(.headline)
                        .foregroundColor(.primary)
                        .lineLimit(1)
                    
                    HStack(spacing: 4) {
                        Image(systemName: "location.fill")
                            .font(.caption)
                        Text(property.address)
                            .font(.caption)
                    }
                    .foregroundColor(.secondary)
                    .lineLimit(1)
                    
                    HStack(spacing: 8) {
                        HStack(spacing: 2) {
                            Image(systemName: "bed.double.fill")
                                .font(.caption2)
                            Text("\(property.rooms)")
                                .font(.caption2)
                        }
                        
                        HStack(spacing: 2) {
                            Image(systemName: "square.fill")
                                .font(.caption2)
                            Text("\(Int(property.area)) м²")
                                .font(.caption2)
                        }
                    }
                    .foregroundColor(.secondary)
                    
                    Text(formatPrice(property.price))
                        .font(.subheadline)
                        .fontWeight(.bold)
                        .foregroundColor(.blue)
                }
                
                Spacer()
                
                // Favorite Button
                Button {
                    viewModel.toggleFavorite(property)
                } label: {
                    Image(systemName: viewModel.isFavorite(property) ? "heart.fill" : "heart")
                        .foregroundColor(viewModel.isFavorite(property) ? .red : .secondary)
                        .padding(8)
                }
            }
            .padding(12)
            .background(Color(.systemBackground))
            .cornerRadius(16)
            .shadow(color: Color.black.opacity(0.15), radius: 10, x: 0, y: 5)
        }
        .buttonStyle(PlainButtonStyle())
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
    MainTabView()
}


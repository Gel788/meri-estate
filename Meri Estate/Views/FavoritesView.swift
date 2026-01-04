//
//  FavoritesView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct FavoritesView: View {
    @EnvironmentObject var viewModel: PropertyViewModel
    
    var body: some View {
        NavigationStack {
            Group {
                if viewModel.favoriteProperties.isEmpty {
                    emptyState
                } else {
                    ScrollView {
                        LazyVStack(spacing: 16) {
                            ForEach(viewModel.favoriteProperties) { property in
                                NavigationLink(destination: PropertyDetailView(property: property).environmentObject(viewModel)) {
                                    PropertyCard(property: property)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        }
                        .padding()
                    }
                    .background(Color(.systemGroupedBackground))
                }
            }
            .navigationTitle("Meri Movs")
            .navigationBarTitleDisplayMode(.large)
        }
    }
    
    private var emptyState: some View {
        VStack(spacing: 20) {
            Image(systemName: "heart.slash")
                .font(.system(size: 80))
                .foregroundColor(.secondary)
            
            Text("Нет избранных объектов")
                .font(.title2)
                .fontWeight(.semibold)
            
            Text("Добавляйте понравившиеся объекты в избранное, нажимая на ❤️")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 40)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(.systemGroupedBackground))
    }
}

#Preview {
    MainTabView()
}


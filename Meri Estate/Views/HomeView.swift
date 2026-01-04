//
//  HomeView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct HomeView: View {
    @EnvironmentObject var viewModel: PropertyViewModel
    @State private var selectedCategory: PropertyStatus? = nil
    @State private var showFilters = false
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    // Header
                    headerSection
                    
                    // Category Filter
                    categorySection
                    
                    // Featured Properties
                    if !featuredProperties.isEmpty {
                        featuredSection
                    }
                    
                    // All Properties
                    allPropertiesSection
                }
                .padding(.horizontal)
                .padding(.bottom, 20)
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Meri Movs")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        showFilters = true
                    } label: {
                        Image(systemName: "slider.horizontal.3")
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
    
    private var headerSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("Найдите дом")
                .font(.system(size: 32, weight: .bold))
            
            Text("своей мечты")
                .font(.system(size: 32, weight: .bold))
                .foregroundColor(.blue)
            
            Text("Лучшие предложения недвижимости")
                .font(.subheadline)
                .foregroundColor(.secondary)
        }
        .padding(.top)
    }
    
    private var categorySection: some View {
        HStack(spacing: 12) {
            CategoryButton(title: "Все", isSelected: selectedCategory == nil) {
                selectedCategory = nil
                viewModel.filter.status = nil
            }
            
            CategoryButton(title: "Продажа", isSelected: selectedCategory == .sale) {
                selectedCategory = .sale
                viewModel.filter.status = .sale
            }
            
            CategoryButton(title: "Аренда", isSelected: selectedCategory == .rent) {
                selectedCategory = .rent
                viewModel.filter.status = .rent
            }
            
            Spacer()
        }
    }
    
    private var featuredProperties: [Property] {
        viewModel.filteredProperties.filter { $0.isFeatured }
    }
    
    private var featuredSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Избранные")
                    .font(.title2)
                    .fontWeight(.bold)
                
                Spacer()
            }
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(featuredProperties) { property in
                        NavigationLink(destination: PropertyDetailView(property: property).environmentObject(viewModel)) {
                            FeaturedPropertyCard(property: property)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
            }
        }
    }
    
    private var allPropertiesSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Все объекты")
                    .font(.title2)
                    .fontWeight(.bold)
                
                Spacer()
                
                Menu {
                    ForEach(PropertyViewModel.SortOption.allCases, id: \.self) { option in
                        Button(option.rawValue) {
                            viewModel.sortOption = option
                        }
                    }
                } label: {
                    HStack(spacing: 4) {
                        Text(viewModel.sortOption.rawValue)
                            .font(.subheadline)
                        Image(systemName: "chevron.down")
                            .font(.caption)
                    }
                    .foregroundColor(.blue)
                }
            }
            
            LazyVStack(spacing: 16) {
                ForEach(viewModel.filteredProperties) { property in
                    NavigationLink(destination: PropertyDetailView(property: property).environmentObject(viewModel)) {
                        PropertyCard(property: property)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
        }
    }
}

struct CategoryButton: View {
    let title: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.subheadline)
                .fontWeight(.semibold)
                .padding(.horizontal, 20)
                .padding(.vertical, 10)
                .background(isSelected ? Color.blue : Color(.systemBackground))
                .foregroundColor(isSelected ? .white : .primary)
                .cornerRadius(20)
                .shadow(color: Color.black.opacity(0.05), radius: 5, x: 0, y: 2)
        }
    }
}

#Preview {
    MainTabView()
}


//
//  SearchView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct SearchView: View {
    @EnvironmentObject var viewModel: PropertyViewModel
    @State private var searchText = ""
    @State private var showFilters = false
    
    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                // Search Bar
                HStack {
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.secondary)
                        
                        TextField("Поиск недвижимости...", text: $searchText)
                            .onChange(of: searchText) { _, newValue in
                                viewModel.filter.searchText = newValue
                            }
                        
                        if !searchText.isEmpty {
                            Button {
                                searchText = ""
                                viewModel.filter.searchText = ""
                            } label: {
                                Image(systemName: "xmark.circle.fill")
                                    .foregroundColor(.secondary)
                            }
                        }
                    }
                    .padding(12)
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    
                    Button {
                        showFilters = true
                    } label: {
                        Image(systemName: hasActiveFilters ? "slider.horizontal.3" : "slider.horizontal.3")
                            .foregroundColor(hasActiveFilters ? .blue : .primary)
                            .padding(12)
                            .background(hasActiveFilters ? Color.blue.opacity(0.1) : Color(.systemGray6))
                            .cornerRadius(12)
                    }
                }
                .padding()
                
                if hasActiveFilters {
                    activeFiltersView
                }
                
                // Results
                ScrollView {
                    LazyVStack(spacing: 16) {
                        if viewModel.filteredProperties.isEmpty {
                            emptyState
                        } else {
                            ForEach(viewModel.filteredProperties) { property in
                                NavigationLink(destination: PropertyDetailView(property: property).environmentObject(viewModel)) {
                                    PropertyCard(property: property)
                                }
                                .buttonStyle(PlainButtonStyle())
                            }
                        }
                    }
                    .padding()
                }
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Meri Movs")
            .navigationBarTitleDisplayMode(.large)
            .sheet(isPresented: $showFilters) {
                FilterView()
                    .environmentObject(viewModel)
            }
        }
    }
    
    private var hasActiveFilters: Bool {
        viewModel.filter.propertyType != nil ||
        viewModel.filter.status != nil ||
        viewModel.filter.minPrice != nil ||
        viewModel.filter.maxPrice != nil ||
        viewModel.filter.minArea != nil ||
        viewModel.filter.maxArea != nil ||
        viewModel.filter.rooms != nil ||
        viewModel.filter.city != nil
    }
    
    private var activeFiltersView: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                if let type = viewModel.filter.propertyType {
                    FilterChip(text: type.rawValue) {
                        viewModel.filter.propertyType = nil
                    }
                }
                
                if let status = viewModel.filter.status {
                    FilterChip(text: status.rawValue) {
                        viewModel.filter.status = nil
                    }
                }
                
                if viewModel.filter.minPrice != nil || viewModel.filter.maxPrice != nil {
                    FilterChip(text: "Цена") {
                        viewModel.filter.minPrice = nil
                        viewModel.filter.maxPrice = nil
                    }
                }
                
                if viewModel.filter.minArea != nil || viewModel.filter.maxArea != nil {
                    FilterChip(text: "Площадь") {
                        viewModel.filter.minArea = nil
                        viewModel.filter.maxArea = nil
                    }
                }
                
                if let rooms = viewModel.filter.rooms {
                    FilterChip(text: "\(rooms) комн.") {
                        viewModel.filter.rooms = nil
                    }
                }
                
                if let city = viewModel.filter.city {
                    FilterChip(text: city) {
                        viewModel.filter.city = nil
                    }
                }
                
                Button("Сбросить все") {
                    viewModel.filter = PropertyFilter()
                }
                .font(.subheadline)
                .foregroundColor(.red)
            }
            .padding(.horizontal)
        }
        .padding(.bottom, 8)
    }
    
    private var emptyState: some View {
        VStack(spacing: 16) {
            Image(systemName: "magnifyingglass")
                .font(.system(size: 60))
                .foregroundColor(.secondary)
            
            Text("Ничего не найдено")
                .font(.title2)
                .fontWeight(.semibold)
            
            Text("Попробуйте изменить параметры поиска")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding()
        .frame(maxWidth: .infinity)
        .padding(.top, 100)
    }
}

struct FilterChip: View {
    let text: String
    let onRemove: () -> Void
    
    var body: some View {
        HStack(spacing: 4) {
            Text(text)
                .font(.caption)
                .fontWeight(.medium)
            
            Button(action: onRemove) {
                Image(systemName: "xmark")
                    .font(.caption)
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 6)
        .background(Color.blue.opacity(0.1))
        .foregroundColor(.blue)
        .cornerRadius(16)
    }
}

#Preview {
    MainTabView()
}


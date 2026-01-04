//
//  MainTabView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct MainTabView: View {
    @StateObject private var viewModel = PropertyViewModel()
    
    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Label("Главная", systemImage: "house.fill")
                }
                .environmentObject(viewModel)
            
            SearchView()
                .tabItem {
                    Label("Поиск", systemImage: "magnifyingglass")
                }
                .environmentObject(viewModel)
            
            FavoritesView()
                .tabItem {
                    Label("Избранное", systemImage: "heart.fill")
                }
                .environmentObject(viewModel)
            
            MapView()
                .tabItem {
                    Label("Карта", systemImage: "map.fill")
                }
                .environmentObject(viewModel)
            
            CalculatorView()
                .tabItem {
                    Label("Калькулятор", systemImage: "calculator.fill")
                }
        }
        .accentColor(.blue)
    }
}

#Preview {
    MainTabView()
}


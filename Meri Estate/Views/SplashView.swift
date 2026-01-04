//
//  SplashView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct SplashView: View {
    @State private var isActive = false
    @State private var scale: CGFloat = 0.3
    @State private var opacity: Double = 0
    @State private var rotation: Double = -180
    @State private var showText = false
    @State private var textOpacity: Double = 0
    
    var body: some View {
        if isActive {
            RootView()
        } else {
            ZStack {
                // White Background
                Color.white
                    .ignoresSafeArea()
                
                // Decorative circles
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [.blue.opacity(0.1), .purple.opacity(0.05)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 300, height: 300)
                    .blur(radius: 50)
                    .offset(x: -100, y: -200)
                    .opacity(opacity)
                
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [.purple.opacity(0.1), .blue.opacity(0.05)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 250, height: 250)
                    .blur(radius: 40)
                    .offset(x: 120, y: 200)
                    .opacity(opacity)
                
                VStack(spacing: 32) {
                    // Modern Logo
                    ZStack {
                        // Background circle with gradient
                        Circle()
                            .fill(
                                LinearGradient(
                                    colors: [.blue.opacity(0.2), .purple.opacity(0.2)],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .frame(width: 140, height: 140)
                            .scaleEffect(scale)
                        
                        // Icon
                        Image(systemName: "building.2.fill")
                            .font(.system(size: 60))
                            .foregroundStyle(
                                LinearGradient(
                                    colors: [.blue, .purple],
                                    startPoint: .topLeading,
                                    endPoint: .bottomTrailing
                                )
                            )
                            .rotationEffect(.degrees(rotation))
                    }
                    .opacity(opacity)
                    
                    // App name
                    if showText {
                        VStack(spacing: 12) {
                            Text("Meri Movs")
                                .font(.system(size: 36, weight: .bold, design: .rounded))
                                .foregroundStyle(
                                    LinearGradient(
                                        colors: [.blue, .purple],
                                        startPoint: .leading,
                                        endPoint: .trailing
                                    )
                                )
                            
                            HStack(spacing: 8) {
                                Circle()
                                    .fill(Color.blue)
                                    .frame(width: 6, height: 6)
                                
                                Text("Недвижимость вашей мечты")
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                                
                                Circle()
                                    .fill(Color.purple)
                                    .frame(width: 6, height: 6)
                            }
                        }
                        .opacity(textOpacity)
                    }
                }
            }
            .onAppear {
                startAnimation()
            }
        }
    }
    
    private func startAnimation() {
        // Phase 1: Icon appears and rotates
        withAnimation(.spring(response: 0.8, dampingFraction: 0.6)) {
            scale = 1.0
            opacity = 1.0
            rotation = 0
        }
        
        // Phase 2: Text appears
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.6) {
            showText = true
            withAnimation(.easeOut(duration: 0.5)) {
                textOpacity = 1.0
            }
        }
        
        // Phase 3: Transition to next screen
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.8) {
            withAnimation(.easeInOut(duration: 0.6)) {
                opacity = 0
                textOpacity = 0
            }
            
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                isActive = true
            }
        }
    }
}

struct RootView: View {
    @State private var isFirstLaunch = UserDefaults.standard.object(forKey: "isFirstLaunch") == nil
    
    var body: some View {
        Group {
            if isFirstLaunch {
                WelcomeView(isFirstLaunch: $isFirstLaunch)
            } else {
                MainTabView()
            }
        }
        .onAppear {
            if UserDefaults.standard.object(forKey: "isFirstLaunch") == nil {
                UserDefaults.standard.set(true, forKey: "isFirstLaunch")
            }
        }
    }
}

#Preview {
    SplashView()
}


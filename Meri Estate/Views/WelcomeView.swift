//
//  WelcomeView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct WelcomeView: View {
    @Binding var isFirstLaunch: Bool
    @State private var currentPage = 0
    @State private var showAnimation = true
    
    let pages: [OnboardingPage] = [
        OnboardingPage(
            icon: "house.fill",
            title: "Найдите дом мечты",
            description: "Тысячи объектов недвижимости в одном приложении. Квартиры, дома, виллы и пентхаусы.",
            color: .blue
        ),
        OnboardingPage(
            icon: "magnifyingglass",
            title: "Умный поиск",
            description: "Мощные фильтры помогут найти идеальный вариант. Поиск по цене, площади, району и другим параметрам.",
            color: .purple
        ),
        OnboardingPage(
            icon: "map.fill",
            title: "Карта объектов",
            description: "Все объекты на интерактивной карте. Выбирайте район, смотрите цены и находите лучшее расположение.",
            color: .green
        ),
        OnboardingPage(
            icon: "calculator.fill",
            title: "Калькулятор ипотеки",
            description: "Рассчитайте ежемесячный платёж и узнайте, сколько вы заплатите за всё время кредита.",
            color: .orange
        ),
        OnboardingPage(
            icon: "person.fill",
            title: "Связь с агентами",
            description: "Свяжитесь с профессиональными агентами напрямую через звонок, email или WhatsApp.",
            color: .red
        )
    ]
    
    var body: some View {
        ZStack {
            // White Background
            Color.white
                .ignoresSafeArea()
            
            if showAnimation {
                KeyUnlockAnimation {
                    withAnimation {
                        showAnimation = false
                    }
                }
            } else {
                onboardingContent
            }
        }
    }
    
    private var onboardingContent: some View {
        VStack(spacing: 0) {
                // Skip button
                HStack {
                    Spacer()
                    if currentPage < pages.count - 1 {
                        Button("Пропустить") {
                            completeOnboarding()
                        }
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .padding()
                    }
                }
                
                Spacer()
                
                // Logo section
                VStack(spacing: 16) {
                    Image(systemName: "building.2.fill")
                        .font(.system(size: 60))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [.blue, .purple],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                    
                    Text("Meri Movs")
                        .font(.system(size: 32, weight: .bold))
                        .foregroundStyle(
                            LinearGradient(
                                colors: [.blue, .purple],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                    
                    Text("Ваш надёжный помощник в поиске недвижимости")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }
                .padding(.bottom, 40)
                
                // Pages
                TabView(selection: $currentPage) {
                    ForEach(0..<pages.count, id: \.self) { index in
                        OnboardingPageView(page: pages[index])
                            .tag(index)
                    }
                }
                .tabViewStyle(.page(indexDisplayMode: .never))
                .frame(height: 400)
                
                // Custom page indicator
                HStack(spacing: 8) {
                    ForEach(0..<pages.count, id: \.self) { index in
                        Capsule()
                            .fill(currentPage == index ? pages[currentPage].color : Color.gray.opacity(0.3))
                            .frame(width: currentPage == index ? 24 : 8, height: 8)
                            .animation(.spring(response: 0.3), value: currentPage)
                    }
                }
                .padding(.vertical, 20)
                
                Spacer()
                
                // Action buttons
                VStack(spacing: 12) {
                    if currentPage == pages.count - 1 {
                        Button {
                            completeOnboarding()
                        } label: {
                            HStack {
                                Text("Начать")
                                    .font(.headline)
                                Image(systemName: "arrow.right")
                            }
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(
                                LinearGradient(
                                    colors: [.blue, .purple],
                                    startPoint: .leading,
                                    endPoint: .trailing
                                )
                            )
                            .cornerRadius(16)
                        }
                    } else {
                        Button {
                            withAnimation {
                                currentPage += 1
                            }
                        } label: {
                            HStack {
                                Text("Далее")
                                    .font(.headline)
                                Image(systemName: "arrow.right")
                            }
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(pages[currentPage].color)
                            .cornerRadius(16)
                        }
                    }
                }
                .padding(.horizontal)
                .padding(.bottom, 40)
            }
            .transition(.opacity)
        }
    
    private func completeOnboarding() {
        withAnimation(.spring(response: 0.5, dampingFraction: 0.8)) {
            isFirstLaunch = false
        }
        UserDefaults.standard.set(false, forKey: "isFirstLaunch")
    }
}

struct OnboardingPage {
    let icon: String
    let title: String
    let description: String
    let color: Color
}

struct OnboardingPageView: View {
    let page: OnboardingPage
    
    var body: some View {
        VStack(spacing: 24) {
            // Icon
            ZStack {
                Circle()
                    .fill(page.color.opacity(0.2))
                    .frame(width: 140, height: 140)
                
                Circle()
                    .fill(page.color.opacity(0.3))
                    .frame(width: 110, height: 110)
                
                Image(systemName: page.icon)
                    .font(.system(size: 50))
                    .foregroundColor(page.color)
            }
            .padding(.bottom, 20)
            
            // Title
            Text(page.title)
                .font(.title)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)
                .foregroundColor(.primary)
            
            // Description
            Text(page.description)
                .font(.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal, 40)
                .lineSpacing(6)
        }
        .padding()
    }
}

// MARK: - Key Unlock Animation
struct KeyUnlockAnimation: View {
    let onComplete: () -> Void
    
    @State private var keyOffset: CGFloat = 200
    @State private var keyRotation: Double = 0
    @State private var lockScale: CGFloat = 0.5
    @State private var lockRotation: Double = 0
    @State private var showUnlocked = false
    @State private var showRays = false
    @State private var raysScale: CGFloat = 0
    @State private var showHouse = false
    @State private var houseScale: CGFloat = 0
    @State private var showText = false
    @State private var textOpacity: Double = 0
    
    var body: some View {
        ZStack {
            // Rays effect
            if showRays {
                ForEach(0..<12) { index in
                    RoundedRectangle(cornerRadius: 2)
                        .fill(
                            LinearGradient(
                                colors: [Color.blue.opacity(0.6), Color.blue.opacity(0)],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .frame(width: 100, height: 4)
                        .offset(x: 50)
                        .rotationEffect(.degrees(Double(index) * 30))
                        .scaleEffect(raysScale)
                        .opacity(raysScale)
                }
            }
            
            // House icon
            if showHouse {
                Image(systemName: "house.fill")
                    .font(.system(size: 120))
                    .foregroundStyle(
                        LinearGradient(
                            colors: [.blue, .purple],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .scaleEffect(houseScale)
                    .opacity(houseScale)
            }
            
            // Lock
            ZStack {
                // Lock body
                Circle()
                    .fill(
                        LinearGradient(
                            colors: showUnlocked ? [.green, .green.opacity(0.7)] : [.gray.opacity(0.3), .gray.opacity(0.5)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 100, height: 100)
                
                Image(systemName: showUnlocked ? "lock.open.fill" : "lock.fill")
                    .font(.system(size: 50))
                    .foregroundColor(showUnlocked ? .white : .gray)
            }
            .scaleEffect(lockScale)
            .rotationEffect(.degrees(lockRotation))
            .offset(y: showHouse ? -200 : 0)
            .opacity(showHouse ? 0 : 1)
            
            // Key
            Image(systemName: "key.fill")
                .font(.system(size: 60))
                .foregroundStyle(
                    LinearGradient(
                        colors: [.orange, .yellow],
                        startPoint: .topLeading,
                        endPoint: .bottomTrailing
                    )
                )
                .rotationEffect(.degrees(keyRotation))
                .offset(x: keyOffset)
                .offset(y: showHouse ? -200 : 0)
                .opacity(showHouse ? 0 : 1)
            
            // Text
            if showText {
                VStack(spacing: 16) {
                    Text("Добро пожаловать")
                        .font(.title)
                        .fontWeight(.bold)
                    
                    Text("Откройте дверь в мир недвижимости")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding(.horizontal, 40)
                .offset(y: 200)
                .opacity(textOpacity)
            }
        }
        .onAppear {
            startAnimation()
        }
    }
    
    private func startAnimation() {
        // Step 1: Lock appears
        withAnimation(.spring(response: 0.6, dampingFraction: 0.7)) {
            lockScale = 1.0
        }
        
        // Step 2: Key moves to lock (after 0.5s)
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            withAnimation(.spring(response: 0.8, dampingFraction: 0.6)) {
                keyOffset = 0
            }
        }
        
        // Step 3: Key rotates and unlocks (after 1.5s)
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            withAnimation(.spring(response: 0.5, dampingFraction: 0.7)) {
                keyRotation = 90
                lockRotation = 15
            }
            
            // Show rays
            withAnimation(.easeOut(duration: 0.5).delay(0.3)) {
                showRays = true
                raysScale = 1.5
            }
        }
        
        // Step 4: Lock opens (after 2.2s)
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.2) {
            withAnimation(.spring(response: 0.4, dampingFraction: 0.6)) {
                showUnlocked = true
                lockScale = 1.2
            }
        }
        
        // Step 5: Show house (after 2.8s)
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.8) {
            withAnimation(.spring(response: 0.6, dampingFraction: 0.6)) {
                showHouse = true
                houseScale = 1.0
            }
            
            // Fade out rays
            withAnimation(.easeOut(duration: 0.5)) {
                raysScale = 2.5
            }
        }
        
        // Step 6: Show text (after 3.3s)
        DispatchQueue.main.asyncAfter(deadline: .now() + 3.3) {
            showText = true
            withAnimation(.easeIn(duration: 0.5)) {
                textOpacity = 1.0
            }
        }
        
        // Step 7: Complete (after 4.5s)
        DispatchQueue.main.asyncAfter(deadline: .now() + 4.5) {
            withAnimation(.easeOut(duration: 0.5)) {
                onComplete()
            }
        }
    }
}

#Preview {
    WelcomeView(isFirstLaunch: .constant(true))
}


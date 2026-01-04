//
//  ContactAgentView.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import SwiftUI

struct ContactAgentView: View {
    let agent: Agent
    @Environment(\.dismiss) var dismiss
    @State private var message: String = ""
    @State private var name: String = ""
    @State private var phone: String = ""
    @State private var showSuccessAlert = false
    
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Agent Info
                    VStack(spacing: 16) {
                        Image(systemName: agent.photo)
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 100, height: 100)
                            .clipShape(Circle())
                            .foregroundColor(.blue)
                            .background(
                                Circle()
                                    .fill(Color.blue.opacity(0.1))
                                    .frame(width: 100, height: 100)
                            )
                        
                        VStack(spacing: 8) {
                            Text(agent.name)
                                .font(.title2)
                                .fontWeight(.bold)
                            
                            HStack(spacing: 4) {
                                Image(systemName: "star.fill")
                                    .foregroundColor(.orange)
                                Text(String(format: "%.1f", agent.rating))
                                    .fontWeight(.semibold)
                                Text("(\(agent.propertiesCount) объектов)")
                                    .foregroundColor(.secondary)
                            }
                            .font(.subheadline)
                            
                            if !agent.description.isEmpty {
                                Text(agent.description)
                                    .font(.subheadline)
                                    .foregroundColor(.secondary)
                                    .multilineTextAlignment(.center)
                                    .padding(.horizontal)
                            }
                        }
                    }
                    .padding()
                    
                    Divider()
                    
                    // Contact Options
                    VStack(spacing: 16) {
                        ContactButton(icon: "phone.fill", title: "Позвонить", subtitle: agent.phone, color: .green) {
                            if let url = URL(string: "tel://\(agent.phone.filter { $0.isNumber })") {
                                UIApplication.shared.open(url)
                            }
                        }
                        
                        ContactButton(icon: "envelope.fill", title: "Email", subtitle: agent.email, color: .blue) {
                            if let url = URL(string: "mailto:\(agent.email)") {
                                UIApplication.shared.open(url)
                            }
                        }
                        
                        ContactButton(icon: "message.fill", title: "WhatsApp", subtitle: "Написать в WhatsApp", color: .green) {
                            if let url = URL(string: "https://wa.me/\(agent.phone.filter { $0.isNumber })") {
                                UIApplication.shared.open(url)
                            }
                        }
                    }
                    .padding(.horizontal)
                    
                    Divider()
                    
                    // Contact Form
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Отправить сообщение")
                            .font(.headline)
                        
                        VStack(spacing: 12) {
                            TextField("Ваше имя", text: $name)
                                .textFieldStyle(.roundedBorder)
                            
                            TextField("Ваш телефон", text: $phone)
                                .textFieldStyle(.roundedBorder)
                                .keyboardType(.phonePad)
                            
                            ZStack(alignment: .topLeading) {
                                if message.isEmpty {
                                    Text("Ваше сообщение")
                                        .foregroundColor(.gray)
                                        .padding(.horizontal, 4)
                                        .padding(.vertical, 8)
                                }
                                
                                TextEditor(text: $message)
                                    .frame(height: 120)
                                    .padding(4)
                                    .background(Color(.systemGray6))
                                    .cornerRadius(8)
                            }
                            
                            Button {
                                sendMessage()
                            } label: {
                                Text("Отправить")
                                    .font(.headline)
                                    .foregroundColor(.white)
                                    .frame(maxWidth: .infinity)
                                    .padding()
                                    .background(Color.blue)
                                    .cornerRadius(12)
                            }
                            .disabled(name.isEmpty || phone.isEmpty || message.isEmpty)
                            .opacity((name.isEmpty || phone.isEmpty || message.isEmpty) ? 0.6 : 1.0)
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Контакты")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Закрыть") {
                        dismiss()
                    }
                }
            }
        }
        .alert("Сообщение отправлено", isPresented: $showSuccessAlert) {
            Button("OK") {
                dismiss()
            }
        } message: {
            Text("Агент свяжется с вами в ближайшее время")
        }
    }
    
    private func sendMessage() {
        // Simulate sending message
        showSuccessAlert = true
    }
}

struct ContactButton: View {
    let icon: String
    let title: String
    let subtitle: String
    let color: Color
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack(spacing: 16) {
                Image(systemName: icon)
                    .font(.title3)
                    .foregroundColor(.white)
                    .frame(width: 50, height: 50)
                    .background(color)
                    .clipShape(Circle())
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(title)
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    Text(subtitle)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .foregroundColor(.secondary)
            }
            .padding()
            .background(Color(.systemGray6))
            .cornerRadius(12)
        }
    }
}

#Preview {
    ContactAgentView(agent: Agent(
        name: "Анна Петрова",
        photo: "person.circle.fill",
        phone: "+7 (495) 123-45-67",
        email: "anna@meriestate.com",
        rating: 4.9,
        propertiesCount: 45,
        experience: 8,
        description: "Профессиональный риэлтор с 8-летним опытом работы"
    ))
}


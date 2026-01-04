//
//  PropertyViewModel.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import Foundation
import Combine

class PropertyViewModel: ObservableObject {
    @Published var properties: [Property] = []
    @Published var filteredProperties: [Property] = []
    @Published var favorites: Set<UUID> = []
    @Published var filter: PropertyFilter = PropertyFilter() {
        didSet {
            applyFilter()
        }
    }
    @Published var sortOption: SortOption = .newest {
        didSet {
            applySort()
        }
    }
    
    enum SortOption: String, CaseIterable {
        case newest = "Новые"
        case priceLowToHigh = "Цена ↑"
        case priceHighToLow = "Цена ↓"
        case areaLowToHigh = "Площадь ↑"
        case areaHighToLow = "Площадь ↓"
    }
    
    init() {
        loadMockData()
        applyFilter()
    }
    
    func applyFilter() {
        filteredProperties = properties.filter { filter.matches($0) }
        applySort()
    }
    
    func applySort() {
        switch sortOption {
        case .newest:
            filteredProperties.sort { $0.isNew && !$1.isNew }
        case .priceLowToHigh:
            filteredProperties.sort { $0.price < $1.price }
        case .priceHighToLow:
            filteredProperties.sort { $0.price > $1.price }
        case .areaLowToHigh:
            filteredProperties.sort { $0.area < $1.area }
        case .areaHighToLow:
            filteredProperties.sort { $0.area > $1.area }
        }
    }
    
    func toggleFavorite(_ property: Property) {
        if favorites.contains(property.id) {
            favorites.remove(property.id)
        } else {
            favorites.insert(property.id)
        }
    }
    
    func isFavorite(_ property: Property) -> Bool {
        favorites.contains(property.id)
    }
    
    var favoriteProperties: [Property] {
        properties.filter { favorites.contains($0.id) }
    }
    
    private func loadMockData() {
        let agents = [
            Agent(name: "Анна Петрова", photo: "person.circle.fill", phone: "+7 (495) 123-45-67", email: "anna@meriestate.com", rating: 4.9, propertiesCount: 45, experience: 8, description: "Профессиональный риэлтор с 8-летним опытом работы"),
            Agent(name: "Дмитрий Иванов", photo: "person.circle.fill", phone: "+7 (495) 234-56-78", email: "dmitry@meriestate.com", rating: 4.8, propertiesCount: 38, experience: 6, description: "Специализируется на элитной недвижимости"),
            Agent(name: "Елена Смирнова", photo: "person.circle.fill", phone: "+7 (495) 345-67-89", email: "elena@meriestate.com", rating: 4.7, propertiesCount: 52, experience: 10, description: "Эксперт по загородной недвижимости")
        ]
        
        properties = [
            Property(
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
                description: "Просторная трёхкомнатная квартира с панорамным видом на центр Москвы. Дизайнерский ремонт, кухня-гостиная, встроенная техника премиум класса. Закрытая территория, подземный паркинг.",
                features: ["Панорамные окна", "Дизайнерский ремонт", "Подземный паркинг", "Консьерж", "Кухня-гостиная", "Встроенная техника"],
                images: ["photo", "photo.fill", "photo.circle", "photo.circle.fill"],
                coordinate: Coordinate(latitude: 55.7558, longitude: 37.6173),
                agent: agents[0],
                yearBuilt: 2020,
                isNew: true,
                isFeatured: true,
                rating: 4.8,
                views: 1250
            ),
            Property(
                title: "Современная студия у метро",
                address: "Кутузовский проспект, 24",
                city: "Москва",
                price: 8500000,
                area: 35,
                rooms: 1,
                bathrooms: 1,
                floors: 10,
                floor: 5,
                propertyType: .studio,
                status: .sale,
                description: "Уютная студия с современным ремонтом. Высокие потолки, большие окна. Развитая инфраструктура, 5 минут до метро.",
                features: ["Высокие потолки", "Новый дом", "Рядом метро", "Ремонт от застройщика", "Тихий двор"],
                images: ["photo", "photo.fill", "photo.circle"],
                coordinate: Coordinate(latitude: 55.7422, longitude: 37.5656),
                agent: agents[1],
                yearBuilt: 2022,
                isNew: true,
                isFeatured: false,
                rating: 4.6,
                views: 890
            ),
            Property(
                title: "Загородная вилла",
                address: "КП \"Рублево\"",
                city: "Московская область",
                price: 85000000,
                area: 450,
                rooms: 6,
                bathrooms: 4,
                floors: 3,
                floor: 0,
                propertyType: .villa,
                status: .sale,
                description: "Роскошная трёхэтажная вилла на охраняемой территории. Собственный бассейн, сауна, винный погреб. Участок 25 соток с ландшафтным дизайном.",
                features: ["Бассейн", "Сауна", "Винный погреб", "Гараж на 3 машины", "Умный дом", "Охрана 24/7", "Собственный участок"],
                images: ["photo", "photo.fill", "photo.circle", "photo.circle.fill", "photo.stack"],
                coordinate: Coordinate(latitude: 55.7558, longitude: 37.4173),
                agent: agents[2],
                yearBuilt: 2021,
                isNew: false,
                isFeatured: true,
                rating: 5.0,
                views: 2340
            ),
            Property(
                title: "Пентхаус с террасой",
                address: "Пресненская набережная, 8",
                city: "Москва",
                price: 120000000,
                area: 280,
                rooms: 4,
                bathrooms: 3,
                floors: 75,
                floor: 75,
                propertyType: .penthouse,
                status: .sale,
                description: "Эксклюзивный пентхаус на последнем этаже с террасой 100 кв.м. Панорамный вид на Москву-Сити. Премиум отделка, потолки 4 метра.",
                features: ["Терраса", "Москва-Сити", "Премиум отделка", "Консьерж", "СПА зона", "Винная комната", "Панорама 360°"],
                images: ["photo", "photo.fill", "photo.circle", "photo.circle.fill"],
                coordinate: Coordinate(latitude: 55.7497, longitude: 37.5386),
                agent: agents[0],
                yearBuilt: 2023,
                isNew: true,
                isFeatured: true,
                rating: 4.9,
                views: 3120
            ),
            Property(
                title: "Двухкомнатная в новостройке",
                address: "ул. Ленинградская, 45",
                city: "Москва",
                price: 15000000,
                area: 65,
                rooms: 2,
                bathrooms: 1,
                floors: 20,
                floor: 12,
                propertyType: .apartment,
                status: .sale,
                description: "Светлая квартира в новом жилом комплексе. Просторная кухня-гостиная, изолированная спальня. Детская площадка, фитнес-центр.",
                features: ["Новостройка", "Детская площадка", "Фитнес-центр", "Консьерж", "Подземный паркинг"],
                images: ["photo", "photo.fill", "photo.circle"],
                coordinate: Coordinate(latitude: 55.7950, longitude: 37.6850),
                agent: agents[1],
                yearBuilt: 2023,
                isNew: true,
                isFeatured: false,
                rating: 4.5,
                views: 670
            ),
            Property(
                title: "Уютный дом в пригороде",
                address: "Одинцовский район, д. Успенское",
                city: "Московская область",
                price: 35000000,
                area: 220,
                rooms: 5,
                bathrooms: 3,
                floors: 2,
                floor: 0,
                propertyType: .house,
                status: .sale,
                description: "Комфортный двухэтажный дом для семьи. Большая гостиная с камином, современная кухня. Участок 15 соток, баня, беседка.",
                features: ["Баня", "Беседка", "Гараж", "Камин", "Теплый пол", "Газовое отопление"],
                images: ["photo", "photo.fill", "photo.circle", "photo.circle.fill"],
                coordinate: Coordinate(latitude: 55.6667, longitude: 37.2667),
                agent: agents[2],
                yearBuilt: 2019,
                isNew: false,
                isFeatured: true,
                rating: 4.7,
                views: 1450
            ),
            Property(
                title: "Квартира с видом на парк",
                address: "Ленинский проспект, 92",
                city: "Москва",
                price: 18000000,
                area: 78,
                rooms: 2,
                bathrooms: 1,
                floors: 16,
                floor: 10,
                propertyType: .apartment,
                status: .sale,
                description: "Уютная двушка с видом на Воробьёвы горы. Качественный ремонт, встроенная мебель. Тихий зелёный район.",
                features: ["Вид на парк", "Встроенная мебель", "Тихий район", "Рядом метро", "Балкон"],
                images: ["photo", "photo.fill"],
                coordinate: Coordinate(latitude: 55.6892, longitude: 37.5608),
                agent: agents[0],
                yearBuilt: 2018,
                isNew: false,
                isFeatured: false,
                rating: 4.4,
                views: 520
            ),
            Property(
                title: "Элитная студия в сталинке",
                address: "Кропоткинская набережная, 7",
                city: "Москва",
                price: 12000000,
                area: 42,
                rooms: 1,
                bathrooms: 1,
                floors: 5,
                floor: 3,
                propertyType: .studio,
                status: .rent,
                description: "Стильная студия в историческом здании. Высокие потолки 3.5м, лепнина. Авторский дизайн, полностью меблирована.",
                features: ["Сталинка", "Высокие потолки", "Лепнина", "Меблирована", "Историческое здание"],
                images: ["photo", "photo.fill", "photo.circle"],
                coordinate: Coordinate(latitude: 55.7450, longitude: 37.6080),
                agent: agents[1],
                yearBuilt: 1952,
                isNew: false,
                isFeatured: true,
                rating: 4.8,
                views: 980
            )
        ]
    }
}


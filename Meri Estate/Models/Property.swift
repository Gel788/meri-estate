//
//  Property.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import Foundation
import CoreLocation

enum PropertyType: String, Codable, CaseIterable {
    case apartment = "Квартира"
    case house = "Дом"
    case studio = "Студия"
    case penthouse = "Пентхаус"
    case villa = "Вилла"
    case land = "Участок"
}

enum PropertyStatus: String, Codable {
    case sale = "Продажа"
    case rent = "Аренда"
}

struct Property: Identifiable, Codable {
    let id: UUID
    var title: String
    var address: String
    var city: String
    var price: Double
    var pricePerMeter: Double
    var area: Double
    var rooms: Int
    var bathrooms: Int
    var floors: Int
    var floor: Int
    var propertyType: PropertyType
    var status: PropertyStatus
    var description: String
    var features: [String]
    var images: [String]
    var coordinate: Coordinate
    var agent: Agent
    var yearBuilt: Int
    var isNew: Bool
    var isFeatured: Bool
    var rating: Double
    var views: Int
    
    init(id: UUID = UUID(), title: String, address: String, city: String, price: Double, area: Double, rooms: Int, bathrooms: Int, floors: Int, floor: Int, propertyType: PropertyType, status: PropertyStatus, description: String, features: [String], images: [String], coordinate: Coordinate, agent: Agent, yearBuilt: Int, isNew: Bool = false, isFeatured: Bool = false, rating: Double = 4.5, views: Int = 0) {
        self.id = id
        self.title = title
        self.address = address
        self.city = city
        self.price = price
        self.pricePerMeter = price / area
        self.area = area
        self.rooms = rooms
        self.bathrooms = bathrooms
        self.floors = floors
        self.floor = floor
        self.propertyType = propertyType
        self.status = status
        self.description = description
        self.features = features
        self.images = images
        self.coordinate = coordinate
        self.agent = agent
        self.yearBuilt = yearBuilt
        self.isNew = isNew
        self.isFeatured = isFeatured
        self.rating = rating
        self.views = views
    }
}

struct Coordinate: Codable, Equatable {
    let latitude: Double
    let longitude: Double
    
    var clCoordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }
}

struct Agent: Identifiable, Codable {
    let id: UUID
    var name: String
    var photo: String
    var phone: String
    var email: String
    var rating: Double
    var propertiesCount: Int
    var experience: Int
    var description: String
    
    init(id: UUID = UUID(), name: String, photo: String, phone: String, email: String, rating: Double = 4.8, propertiesCount: Int = 0, experience: Int = 5, description: String = "") {
        self.id = id
        self.name = name
        self.photo = photo
        self.phone = phone
        self.email = email
        self.rating = rating
        self.propertiesCount = propertiesCount
        self.experience = experience
        self.description = description
    }
}


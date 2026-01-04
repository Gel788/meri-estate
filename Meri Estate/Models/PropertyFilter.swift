//
//  PropertyFilter.swift
//  Meri Estate
//
//  Created by Альберт Гилоян on 16.12.2025.
//

import Foundation

struct PropertyFilter {
    var searchText: String = ""
    var propertyType: PropertyType?
    var status: PropertyStatus?
    var minPrice: Double?
    var maxPrice: Double?
    var minArea: Double?
    var maxArea: Double?
    var rooms: Int?
    var city: String?
    
    func matches(_ property: Property) -> Bool {
        if !searchText.isEmpty {
            let lowercasedSearch = searchText.lowercased()
            if !property.title.lowercased().contains(lowercasedSearch) &&
               !property.address.lowercased().contains(lowercasedSearch) &&
               !property.city.lowercased().contains(lowercasedSearch) {
                return false
            }
        }
        
        if let type = propertyType, property.propertyType != type {
            return false
        }
        
        if let status = status, property.status != status {
            return false
        }
        
        if let minPrice = minPrice, property.price < minPrice {
            return false
        }
        
        if let maxPrice = maxPrice, property.price > maxPrice {
            return false
        }
        
        if let minArea = minArea, property.area < minArea {
            return false
        }
        
        if let maxArea = maxArea, property.area > maxArea {
            return false
        }
        
        if let rooms = rooms, property.rooms != rooms {
            return false
        }
        
        if let city = city, !city.isEmpty, property.city != city {
            return false
        }
        
        return true
    }
}


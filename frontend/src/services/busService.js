import { apiClient } from './apiClient'

export const getNearbyBuses = () => apiClient('/buses/nearby')

import { apiClient } from './apiClient'

export const getBackendHealth = () => apiClient('/health')

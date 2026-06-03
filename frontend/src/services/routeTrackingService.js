import { apiClient } from './apiClient'

export const getRouteTracking = (routeId) => apiClient(`/routes/${routeId}/tracking`)

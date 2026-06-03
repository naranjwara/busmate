import { getHealthStatus } from '../services/healthService.js'
import { successResponse } from '../utils/apiResponse.js'

export const healthCheck = (_req, res) => {
  res.status(200).json(
    successResponse({
      message: 'BusMate API is healthy',
      data: getHealthStatus(),
    }),
  )
}

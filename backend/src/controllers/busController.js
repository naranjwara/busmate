import { getNearbyBuses } from '../services/busService.js'
import { successResponse } from '../utils/apiResponse.js'

export const listNearbyBuses = (_req, res) => {
  res.status(200).json(
    successResponse({
      message: 'Nearby buses retrieved successfully',
      data: getNearbyBuses(),
    }),
  )
}

import { getRouteTracking } from '../services/routeTrackingService.js'
import { errorResponse, successResponse } from '../utils/apiResponse.js'

export const showRouteTracking = (req, res) => {
  const tracking = getRouteTracking(req.params.id)

  if (!tracking) {
    res.status(404).json(
      errorResponse({
        message: `Route tracking ${req.params.id} not found`,
      }),
    )
    return
  }

  res.status(200).json(
    successResponse({
      message: 'Route tracking retrieved successfully',
      data: tracking,
    }),
  )
}

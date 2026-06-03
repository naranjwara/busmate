import { errorResponse } from '../utils/apiResponse.js'

export const notFoundMiddleware = (req, res) => {
  res.status(404).json(
    errorResponse({
      message: `Route ${req.method} ${req.originalUrl} not found`,
    }),
  )
}

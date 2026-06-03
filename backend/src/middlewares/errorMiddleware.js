import { env } from '../config/env.js'
import { errorResponse } from '../utils/apiResponse.js'

export const errorMiddleware = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500

  res.status(statusCode).json(
    errorResponse({
      message: err.message || 'Internal server error',
      details: env.nodeEnv === 'production' ? null : err.stack,
    }),
  )
}

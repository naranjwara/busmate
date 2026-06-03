import { env } from '../config/env.js'

export const getHealthStatus = () => ({
  service: 'busmate-api',
  status: 'ok',
  environment: env.nodeEnv,
  timestamp: new Date().toISOString(),
})

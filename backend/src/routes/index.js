import { Router } from 'express'
import busRoutes from './busRoutes.js'
import healthRoutes from './healthRoutes.js'
import routeRoutes from './routeRoutes.js'

const router = Router()

router.use('/buses', busRoutes)
router.use('/health', healthRoutes)
router.use('/routes', routeRoutes)

export default router

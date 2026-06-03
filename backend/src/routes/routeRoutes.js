import { Router } from 'express'
import { showRouteTracking } from '../controllers/routeTrackingController.js'

const router = Router()

router.get('/:id/tracking', showRouteTracking)

export default router

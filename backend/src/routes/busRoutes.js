import { Router } from 'express'
import { listNearbyBuses } from '../controllers/busController.js'

const router = Router()

router.get('/nearby', listNearbyBuses)

export default router

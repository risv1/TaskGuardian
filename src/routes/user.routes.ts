import express from 'express'
import { HelloWorld } from '../controllers/user.controller'

export const router = express.Router()

router.get('/', HelloWorld)
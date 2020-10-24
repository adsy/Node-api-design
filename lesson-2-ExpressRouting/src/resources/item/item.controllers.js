import { model } from 'mongoose'
import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'

export default crudControllers(Item)

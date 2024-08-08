import { Router } from 'express';
import {
  createUser,
  deleteSingleUserData,
  getAllUsersData,
  getSingleUserData,
  updateSingleUserData,
} from '../controllers/userController.js';
const router = Router();

router.get('/', getAllUsersData);
router.post('/add-user', createUser);

router
  .route('/:id')
  .get(getSingleUserData)
  .patch(updateSingleUserData)
  .delete(deleteSingleUserData);

export default router;

import { Router } from "express"
import { addToWishlist, getAll, getById, listWishlistByUser, removeWishlist } from "../controller/WishlistController.js";

const router = Router()

router.post('/addToWishlist', addToWishlist);
router.get('/viewall',getAll)
router.get('/listWishlist/:id', listWishlistByUser);

router.get('/removewishlist/:userId/:productId', removeWishlist);

router.get('/:id', getById);


export default router;
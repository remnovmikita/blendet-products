import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controlles/productControlles.js';
import { celebrate } from 'celebrate';
import {
  createProductsShema,
  getProductsShema,
  productIdParamsShema,
  updateProductsShema,
} from '../validation/productsValidation.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use("/products", authenticate);

router.get('/products', celebrate(getProductsShema), getAllProducts);
router.get(
  '/products/:productId',
  celebrate(productIdParamsShema),
  getProductById,
);
router.post('/products', celebrate(createProductsShema), createProduct);
router.delete(
  '/products/:productId',
  celebrate(productIdParamsShema),
  deleteProduct,
);
router.patch(
  '/products/:productId',
  celebrate(updateProductsShema),
  updateProduct,
);

export default router;

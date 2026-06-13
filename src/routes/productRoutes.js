import { Router } from 'express';
import {
  createProduct,
  deleteProducr,
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

const router = Router();

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
  deleteProducr,
);
router.patch(
  '/products/:productId',
  celebrate(updateProductsShema),
  updateProduct,
);

export default router;

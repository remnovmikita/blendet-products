import { Router } from "express";
import { createProduct, deleteProducr, getAllProducts, getProductById, updateProducts } from "../controlles/productControlles.js";

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/:productId", getProductById);
router.post("/products", createProduct);
router.delete("/products/:productId", deleteProducr);
router.patch("/products/:productId", updateProducts);

export default router;

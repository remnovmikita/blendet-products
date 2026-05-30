import { Product } from "../src/models/products.js";

export const getAllProducts = async(req, res)=>{
  const products = await Product.find();
  res.status(200).json(products);
};
export const getProductById = async(req, res)=>{
  const {productId} = req.params;
  const product = await Product.findById(productId);
  if(!product){
    return res.status(404).json({
      message: `Product by${productId} not find`
    });
  }
  res.status(200).json(product);
};

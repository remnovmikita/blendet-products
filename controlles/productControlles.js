import createHttpError from "http-errors";
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
export const createProduct = async(req, res)=>{
  const product = await Product.create(req.body);
  res.status(201).json(product);
};
export const deleteProducr = async(req, res)=>{
  const {productId} = req.params;
  const product = await Product.findOneAndDelete({_id: productId});
  if(!product){
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json(product);
};
export const updateProducts = async(req, res)=>{
  const {productId}= req.params;
  const products = await Product.findOneAndUpdate({_id: productId,  returnDocument: 'after'});
  if(!productId){
    throw createHttpError(404, `Note with id=${productId} not found`);
  }
  res.status(200).json(products);
};

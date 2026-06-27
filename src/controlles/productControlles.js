import createHttpError from 'http-errors';
import { Product } from '../models/products.js';

export const getAllProducts = async (req, res) => {
  const { page = 1, per_Page = 10, category, minPrice, maxPrice } = req.query;

  const productsQuery = Product.find({userId: req.user._id});
  if (category) {
    productsQuery.where('category').equals(category);
  }
  if (minPrice) {
    productsQuery.where('price').gte(minPrice);
  }
  if (maxPrice) {
    productsQuery.where('price').lte(maxPrice);
  }
  const skip = (page - 1) * per_Page;
  const [totalProducts, products] = await Promise.all([
    productsQuery.clone().countDocuments(),
    productsQuery.skip(skip).limit(per_Page),
  ]);
  const totalPages = Math.ceil(totalProducts / per_Page);

  res.status(200).json({
    page,
    per_Page,
    totalProducts,
    totalPages,
    products,
  });
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({_id:productId, userId: req.user._id});
  if (!product) {
    return res.status(404).json({
      message: `Product by${productId} not found`,
    });
  }
  res.status(200).json(product);
};
export const createProduct = async (req, res) => {
  const { _id: userId } = req.user;
  const product = await Product.create({ ...req.body, userId });
  res.status(201).json(product);
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndDelete({ _id: productId, userId:req.user._id});
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  res.status(200).json(product);
};
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      userId:req.user._id,
    },
    req.body,
    { returnDocument: 'after' },
  );
  if (!product) {
    throw createHttpError(404, `Product with id not found`);
  }
  res.status(200).json(product);
};

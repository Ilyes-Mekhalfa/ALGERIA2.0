import ProductService from '../services/product.service.js';

export const createProduct = async (req, res, next) => {
  try {
    const product = await ProductService.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const listProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const result = await ProductService.findAll({ page, limit, search });
    res.json({ success: true, data: result.items, total: result.total });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await ProductService.findById(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await ProductService.update(req.params.id, req.body);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await ProductService.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export default { createProduct, listProducts, getProduct, updateProduct, deleteProduct };

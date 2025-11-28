import Product from '../model/product.model.js';
import AppError from '@microservices/shared/utils/appError.js';

class ProductService {
  async create(data) {
    const product = await Product.create(data);
    return product;
  }

  async findAll({ page = 1, limit = 20, search } = {}) {
    const skip = (page - 1) * limit;
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const [items, total] = await Promise.all([
      Product.find(query).skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 }),
      Product.countDocuments(query)
    ]);
    return { items, total };
  }

  async findById(id) {
    const product = await Product.findById(id);
    if (!product) throw new AppError('Product not found', 404);
    return product;
  }

  async update(id, updates) {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!product) throw new AppError('Product not found', 404);
    return product;
  }

  async delete(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new AppError('Product not found', 404);
    return product;
  }
}

export default new ProductService();

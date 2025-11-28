import Product from '../models/product.model.js';

class ProductService {
	async create(data) {
		const product = await Product.create(data);
		return product;
	}

	async getProductById(id) {
		if (!id) return null;
		const product = await Product.findById(id);
		return product;
	}

	async getAllProducts({ filter = {}, page = 1, limit = 20, sort = { createdAt: -1 } } = {}) {
		const skip = (Number(page) - 1) * Number(limit);
		const [items, total] = await Promise.all([
			Product.find(filter).skip(skip).limit(Number(limit)).sort(sort),
			Product.countDocuments(filter),
		]);
		return { items, total, page: Number(page), limit: Number(limit) };
	}

	async updateProduct(id, data) {
		if (!id) return null;
		const updated = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
		return updated;
	}

	async deleteProduct(id) {
		if (!id) return null;
		const deleted = await Product.findByIdAndDelete(id);
		return deleted;
	}

    async findMany(filter) {
        return await Product.find(filter)
    }
}

export default new ProductService();

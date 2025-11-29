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

	async getAllProducts() {
        return await Product.find()
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

import Product from "../models/product.model.js";

class ProductService {
  async create(data) {
    const product = await Product.create(data);
    return product;
  }

  async getProductById(id) {
    if (!id) return null;

    // --- THIS IS THE FIX ---
    // We chain .populate() to the findById query.
    const product = await Product.findById(id).populate(
      "userId", // The field in the Product schema to populate
      "username location" // The fields from the User document to return (e.g., username and location)
    );
    // ---------------------

    return product;
  }

  async getAllProducts() {
    return await Product.find();
  }

  async updateProduct(id, data) {
    if (!id) return null;
    const updated = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return updated;
  }

  async deleteProduct(id) {
    if (!id) return null;
    const deleted = await Product.findByIdAndDelete(id);
    return deleted;
  }

  async findMany(filter) {
    return await Product.find(filter);
  }
}

export default new ProductService();

import Order from '../models/order.model.js';

class OrderService {
    async create(data){
        return await Order.create(data)
    }

    async getOrderById(id){
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                success : false,
                message : "order not found"
            })
        }
    }

    async getAllOrders(){
        return await Order.find()
    }

    async updateOrder(id , data){
        const updated = await Order.findByIdAndUpdate(
            id,
            data,
            {new : true , runValidators : true}
        )

        return updated
    }

    async deleteOrder(id){
        return await Order.findByIdAndDelete(id)
    }
    
    async findOrdersByUser(userId) {
    if (!userId) {
      return [];
    }
    
    // This query finds all orders where the 'userId' matches either the 'buyer' field OR the 'seller' field.
    const orders = await Order.find({
      $or: [{ buyer: userId }, { seller: userId }]
    })
    .populate('buyer', 'username') // Optional: Replaces buyer ID with their username
    .populate('seller', 'username'); // Optional: Replaces seller ID with their username

    return orders;
  }

}

export default new OrderService()
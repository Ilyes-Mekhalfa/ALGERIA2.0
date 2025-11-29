import Order from '../models/order.model.js';
import User from '../models/user.model.js';

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


    return orders;
  }

}

export default new OrderService()
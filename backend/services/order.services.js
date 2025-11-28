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
}
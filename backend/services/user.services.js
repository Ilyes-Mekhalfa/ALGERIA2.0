import User from '../models/user.model.js';
import AppError from '../utils/appError.js';
import  {generateToken}  from '../utils/jwt.js';

class UserService {
    async register({ username, email, password }) {
    // Check if user already exists
    const existingUser = await User.findOne({ email});

    if (existingUser) {  
        throw new AppError('Email already registered', 400);
    }
    

    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });
    console.log(process.env.JWT_SECRET);
    
    // Generate JWT token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    });

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    };
  }

  async login({ email, password }) {
    // Find user with password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }


    // Verify password
    const isPasswordValid = await user.correctPassword(password , user.password);

    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    });

    return {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin
      },
      token
    };
  }

  async getUserById(userId) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async getUserByEmail(userEmail) {
    const user = await User.findById(userEmail);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async getUserByToken(token){
    const user = await User.findOne({ resetPasswordToken: token , resetPasswordExpire : {$gt : Date.now()} });

    if(!user){
        throw new AppError('Invalid or expired password reset token', 400)
    }
    return user
  }
  async updateUser(userId, updates) {
    // Remove fields that shouldn't be updated directly
    delete updates.password;
    delete updates.role;
    delete updates.email;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return { message: 'User deleted successfully' };
  }

  async getAllUsers({ page, limit, search }) {
    const query = search 
      ? { 
          $or: [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }
      : {};

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      User.countDocuments(query)
    ]);

    return {
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        limit: parseInt(limit)
      }
    };
  }
}

export default new UserService();
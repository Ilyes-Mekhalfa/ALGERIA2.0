const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');
const { AppError } = require('../utils/appError');

class UserService {
  async register({ username, email, password }) {
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new AppError('Email already registered', 400);
      }
      if (existingUser.username === username) {
        throw new AppError('Username already taken', 400);
      }
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });

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

    // Check if account is active
    if (!user.isActive) {
      throw new AppError('Account is deactivated', 403);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

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

module.exports = new UserService();
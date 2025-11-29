import User from '../models/user.model.js';
import AppError from '../utils/appError.js';
import  {generateToken}  from '../utils/jwt.js';
import crypto from 'crypto';

class UserService {
    async register({ username, email, password, role, referralCode }) {
    // Check if user already exists
    const existingUser = await User.findOne({ email});

    if (existingUser) {  
        throw new AppError('Email already registered', 400);
    }
    

    // Generate a unique referral code for the new user
    let newReferralCode = crypto.randomBytes(4).toString('hex');
    // avoid rare collision
    while (await User.findOne({ referralCode: newReferralCode })) {
      newReferralCode = crypto.randomBytes(4).toString('hex');
    }

    // Prepare new user payload
    const newUserPayload = {
      username,
      email,
      password,
      role,
      referralCode: newReferralCode
    };

    // If a referral code was provided, attempt to link to referrer
    let referrer = null;
    if (referralCode) {
      referrer = await User.findOne({ referralCode: referralCode });
      if (referrer) {
        newUserPayload.referredBy = referrer._id;
      }
    }

    // Create new user
    const user = await User.create(newUserPayload);
    console.log(process.env.JWT_SECRET);
    
    // Generate JWT token
    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role
    });

    // If we have a referrer, credit them 20 points and increment referralsCount
    if (referrer) {
      referrer.points = (referrer.points || 0) + 20;
      referrer.referralsCount = (referrer.referralsCount || 0) + 1;
      try {
        await referrer.save();
      } catch (e) {
        // non-fatal: don't block registration if saving referrer fails
        console.warn('Failed to update referrer points:', e.message);
      }
    }

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

  async getAllUsers() {
    return await User.find();
  }
}

export default new UserService();
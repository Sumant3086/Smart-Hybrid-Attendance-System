import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/generateToken.js';
import { createAuditLog } from '../middleware/auditLogger.js';

/**
 * Register new user
 */
export const register = async (req, res) => {
  try {
    const { name, email, password, role, studentId, department } = req.body;
    
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }
    
    // Create user data object
    const userData = {
      name,
      email,
      password,
      role: role || 'STUDENT',
      department,
    };
    
    // Only add studentId if provided and role is STUDENT
    if (studentId && (role === 'STUDENT' || !role)) {
      userData.studentId = studentId;
    }
    
    // Create user
    const user = await User.create(userData);
    
    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);
    
    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();
    
    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    // Log registration - wrapped in try-catch to prevent crashes
    try {
      await createAuditLog(
        { ...req, user: { _id: user._id } },
        'REGISTER',
        'User',
        user._id,
        { role: user.role, email: user.email }
      );
    } catch (auditError) {
      console.error('Audit logging failed:', auditError);
      // Continue with response even if audit logging fails
    }
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed',
    });
  }
};

/**
 * Login user
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email, passwordLength: password?.length });
    
    // Find user with password field
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !user.isActive) {
      console.log('User not found or inactive:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    
    console.log('User found:', { email: user.email, role: user.role });
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    
    console.log('About to generate tokens...');
    
    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);
    
    console.log('Tokens generated successfully');
    
    // Save refresh token
    user.refreshToken = refreshToken;
    console.log('About to save user with refresh token...');
    await user.save();
    console.log('User saved successfully');
    
    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    console.log('Cookie set successfully');
    
    // Remove password from response
    user.password = undefined;
    
    console.log('Login successful, sending response');
    
    // Log successful login - wrapped in try-catch to prevent crashes
    try {
      await createAuditLog(
        { ...req, user: { _id: user._id } },
        'LOGIN',
        'User',
        user._id,
        { role: user.role, email: user.email }
      );
    } catch (auditError) {
      console.error('Audit logging failed:', auditError);
      // Continue with response even if audit logging fails
    }
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Refresh access token
 */
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not provided',
      });
    }
    
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }
    
    // Find user
    const user = await User.findById(decoded.userId).select('+refreshToken');
    
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }
    
    // Generate new access token
    const accessToken = generateAccessToken(user._id, user.role);
    
    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Logout user
 */
export const logout = async (req, res) => {
  try {
    // Clear refresh token from database
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
    
    // Clear cookie
    res.clearCookie('refreshToken');
    
    // Log logout - wrapped in try-catch to prevent crashes
    try {
      await createAuditLog(
        req,
        'LOGOUT',
        'User',
        req.user._id,
        { email: req.user.email }
      );
    } catch (auditError) {
      console.error('Audit logging failed:', auditError);
      // Continue with response even if audit logging fails
    }
    
    res.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get current user profile
 */
export const getProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

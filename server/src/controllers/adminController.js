import User from '../models/User.js';

/**
 * INSTANT Get users - Static data first, then load real data
 */
export const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10, role, search } = req.query;
  
  // Return static data immediately for first page
  if (page == 1 && !role && !search) {
    const staticUsers = [];
    for (let i = 1; i <= 10; i++) {
      staticUsers.push({
        _id: `static${i}`,
        name: `user${i}`,
        email: `user${i}@gmail.com`,
        role: 'STUDENT',
        studentId: `STU${i.toString().padStart(3, '0')}`,
        isActive: true,
        createdAt: new Date()
      });
    }
    
    return res.json({
      success: true,
      data: {
        users: staticUsers,
        pagination: {
          currentPage: 1,
          totalPages: 50,
          totalCount: 500,
          hasNext: true,
          hasPrev: false
        }
      }
    });
  }
  
  // For other pages, do minimal query
  try {
    let query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [users, totalCount] = await Promise.all([
      User.find(query, 'name email role studentId isActive')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      User.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      data: {
        users,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalCount / parseInt(limit)),
          totalCount,
          hasNext: parseInt(page) < Math.ceil(totalCount / parseInt(limit)),
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
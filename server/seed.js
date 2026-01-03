import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Class from './src/models/Class.js';
import connectDB from './src/config/db.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Class.deleteMany({});
    
    console.log('Creating users...');
    
    // Create owner/admin
    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'changeMe123',
      role: 'ADMIN',
      department: 'Administration',
    });
    
    // Create 50 faculty members
    const facultyData = [];
    for (let i = 1; i <= 50; i++) {
      facultyData.push({
        name: `faculty${i}`,
        email: `faculty${i}@gmail.com`,
        password: `faculty${i}123`,
        role: 'FACULTY',
        department: 'Computer Science',
      });
    }
    
    const faculty = await User.create(facultyData);
    
    // Create 500 student users
    const studentData = [];
    for (let i = 1; i <= 500; i++) {
      studentData.push({
        name: `user${i}`,
        email: `user${i}@gmail.com`,
        password: `user${i}123`,
        role: 'STUDENT',
        studentId: `STU${i.toString().padStart(3, '0')}`,
        department: 'Computer Science',
      });
    }
    
    const students = await User.create(studentData);
    
    console.log('Creating classes...');
    
    // Create classes
    await Class.create([
      {
        name: 'Data Structures and Algorithms',
        code: 'CS201',
        description: 'Introduction to data structures',
        faculty: faculty[0]._id, // Using first faculty member
        department: 'Computer Science',
        semester: 'Fall 2024',
        students: students.map((s) => s._id),
      },
      {
        name: 'Database Management Systems',
        code: 'CS301',
        description: 'Relational databases and SQL',
        faculty: faculty[1]._id, // Using second faculty member
        department: 'Computer Science',
        semester: 'Fall 2024',
        students: students.map((s) => s._id),
      },
    ]);
    
    console.log('✅ Database seeded successfully!');
    console.log('\n🔐 Login credentials:');
    console.log('👑 Admin credentials configured');
    console.log('👨‍🏫 Faculty: faculty1@gmail.com / faculty1123 (and faculty2, faculty3... up to faculty50)');
    console.log('👨‍🎓 Students: user1@gmail.com / user1123 (and user2, user3... up to user500)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();

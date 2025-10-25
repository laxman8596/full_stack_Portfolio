import mongoose from 'mongoose';

export default async function connectToDB() {
  try {
    await mongoose.connect('mongodb+srv://admin:admin123@nextj-portfolio.ptlpjvs.mongodb.net/');
    console.log('Database connected successfully');
  } catch (e) {
    console.log(e);
  }
}

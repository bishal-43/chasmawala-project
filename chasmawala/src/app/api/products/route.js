import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import Product from '@/models/productModel';
import { writeFile } from 'fs/promises';
import { verifyAdminToken } from '@/lib/auth';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { IncomingForm } from 'formidable';
import fs from 'fs';

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to parse form-data using formidable (works in Edge Runtime too)
function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: false, uploadDir: '/tmp', keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req) {
  await connectDB();

  // Extract the token manually from cookies
  const cookieHeader = req.headers.get('cookie');
  const token = cookieHeader?.split(';').find(c => c.trim().startsWith('admin-token='))?.split('=')[1];

  const isAdmin = await verifyAdminToken(token);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { fields, files } = await parseForm(req);

    const { name, description, price, category } = fields;
    let imagePath = '';

    if (files.image) {
      const tempPath = files.image.filepath || files.image.path;
      const fileExt = path.extname(files.image.originalFilename);
      const newFileName = uuidv4() + fileExt;
      const newFilePath = path.join(process.cwd(), 'public', 'uploads', newFileName);

      await fs.promises.copyFile(tempPath, newFilePath);
      imagePath = '/uploads/' + newFileName;
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      image: imagePath,
    });

    const saved = await product.save();
    return NextResponse.json({ message: 'Product uploaded successfully', product: saved }, { status: 201 });
  } catch (err) {
    console.error('❌ Upload error:', err);
    return NextResponse.json({ error: 'Failed to upload product' }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

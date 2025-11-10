import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { dbconnect } from '@/lib/dbconnect';
import UserModel from '@/model/user.model';

export async function GET(request: NextRequest) {
  try {
    await dbconnect();

    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;
    // console.log("Decoded Token in /api/user/me:", decodedToken);
    const user = await UserModel.findById(decodedToken._id).select('-password -refreshToken -verifyCode -verifyCodeExpiry');

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          isVerified: user.isVerified,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in /api/user/me:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

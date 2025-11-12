import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { dbconnect } from '@/lib/dbconnect';
import UserModel from '@/model/user.model';
import { generateAccessAndRefreshToken } from '@/helpers/auth';

export async function GET(request: NextRequest) {
  try {
    await dbconnect();

    let token = request.cookies.get('accessToken')?.value;
    let user;

    if (token) {
      try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;
        user = await UserModel.findById(decodedToken._id).select('-password -refreshToken -verifyCode -verifyCodeExpiry');
      } catch (error: any) {
        // Access token is invalid or expired, try refresh token
        console.log('Access token invalid, attempting refresh');
        token = '';
      }
    }

    if (!token) {
      // Try to refresh using refresh token
      const refreshToken = request.cookies.get('refreshToken')?.value;

      if (!refreshToken) {
        return NextResponse.json(
          { success: false, message: 'Session expired, please login again' },
          { status: 401 }
        );
      }

      try {
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as any;
        const userWithRefreshToken = await UserModel.findOne({ _id: decodedRefreshToken._id, refreshToken });

        if (!userWithRefreshToken) {
          return NextResponse.json(
            { success: false, message: 'Session expired, please login again' },
            { status: 401 }
          );
        }

        // Generate new access token
        const { accessToken: newAccessToken } = await generateAccessAndRefreshToken(userWithRefreshToken?._id.toString());

        // Set new access token in cookies
        const response = NextResponse.json(
          {
            success: true,
            user: {
              _id: userWithRefreshToken._id,
              username: userWithRefreshToken.username,
              email: userWithRefreshToken.email,
              isVerified: userWithRefreshToken.isVerified,
            },
          },
          { status: 200 }
        );

        response.cookies.set('accessToken', newAccessToken, {
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        return response;
      } catch (error: any) {
        console.error('Refresh token verification failed:', error);
        return NextResponse.json(
          { success: false, message: 'Session expired, please login again' },
          { status: 401 }
        );
      }
    }

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

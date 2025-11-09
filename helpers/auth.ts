import jwt, { Secret } from "jsonwebtoken";
import UserModel from "@/model/user.model";

export async function generateAccessAndRefreshToken(userId: string) {
  try {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");

    const accessSecret = process.env.ACCESS_TOKEN_SECRET as Secret;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET as Secret;

    const accessExpiry = process.env.ACCESS_TOKEN_EXPIRY || "1d";
    const refreshExpiry = process.env.REFRESH_TOKEN_EXPIRY || "10d";

    const accessToken = jwt.sign(
      { _id: user._id, email: user.email, username: user.username },
      accessSecret,
      { expiresIn: accessExpiry }
    );

    const refreshToken = jwt.sign(
      { _id: user._id },
      refreshSecret,
      { expiresIn: refreshExpiry }
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw new Error("Token generation failed");
  }
}

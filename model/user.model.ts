import mongoose,{Schema, Document} from 'mongoose'
import jwt from 'jsonwebtoken'
export interface User extends Document {
  username: string;
  password: string;
  email: string;
  isVerified: boolean;
  verifyCode: string;
  refreshToken?: string;
  verifyCodeExpiry: Date;
}


const userSchema = new Schema<User>({
  username: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, unique: true, match: [/.+\@.+\..+/, 'Please use a valid email address'] },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  refreshToken: { type: String },
  verifyCode: { type: String },
  verifyCodeExpiry: { type: Date,default: Date.now },
});


// userSchema.methods.generateAccessToken = async function (): Promise<string> {
//   return jwt.sign(
//     { _id: this._id, email: this.email, username: this.username },
//     process.env.ACCESS_TOKEN_SECRET as string,
//     { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" }
//   );
// };

// userSchema.methods.generateRefreshToken = async function (): Promise<string> {
//   return jwt.sign(
//     { _id: this._id, email: this.email, username: this.username },
//     process.env.REFRESH_TOKEN_SECRET as string,
//     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d" }
//   );
// };
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);

export default UserModel;

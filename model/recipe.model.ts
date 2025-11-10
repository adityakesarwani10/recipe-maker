import mongoose, { Schema, Document } from 'mongoose';

export interface Recipe extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  chef: string;
  videoUrl: string;
  ingredients: string[];
  instructions: string[];
  isVeg: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const recipeSchema = new Schema<Recipe>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  prepTime: { type: String, required: true },
  cookTime: { type: String, required: true },
  servings: { type: Number, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  chef: { type: String, required: true },
  videoUrl: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  isVeg: { type: Boolean, default: false },
  slug: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

const RecipeModel = (mongoose.models.Recipe as mongoose.Model<Recipe>) || mongoose.model<Recipe>("Recipe", recipeSchema);

export default RecipeModel;

import { NextRequest, NextResponse } from 'next/server';
import {dbconnect} from '@/lib/dbconnect';
import RecipeModel from '@/model/recipe.model';

export async function GET(request: NextRequest) {
  try {
    await dbconnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');

    const skip = (page - 1) * limit;

    let query: any = {};
    if (category) {
      query.category = category;
    }

    const recipes = await RecipeModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const totalRecipes = await RecipeModel.countDocuments(query);
    const totalPages = Math.ceil(totalRecipes / limit);

    return NextResponse.json({
      success: true,
      message: 'Recipes fetched successfully',
      data: recipes,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecipes,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch recipes',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbconnect();

    const body = await request.json();
    const {
      title,
      description,
      image,
      category,
      prepTime,
      cookTime,
      servings,
      difficulty,
      rating,
      chef,
      videoUrl,
      ingredients,
      instructions,
      isVeg,
      slug
    } = body;

    // Validate required fields
    if (!title || !description || !image || !category || !prepTime || !cookTime ||
        !servings || !difficulty || !chef || !videoUrl || !ingredients || !instructions || !slug) {
      return NextResponse.json(
        {
          success: false,
          message: 'All required fields must be provided',
        },
        { status: 400 }
      );
    }

    const newRecipe = new RecipeModel({
      title,
      description,
      image,
      category,
      prepTime,
      cookTime,
      servings,
      difficulty,
      rating: rating || 0,
      chef,
      videoUrl,
      ingredients,
      instructions,
      isVeg: isVeg || false,
      slug
    });

    const savedRecipe = await newRecipe.save();

    return NextResponse.json({
      success: true,
      message: 'Recipe created successfully',
      data: savedRecipe,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create recipe',
      },
      { status: 500 }
    );
  }
}

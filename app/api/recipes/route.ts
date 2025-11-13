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
    const trending = searchParams.get('trending') === 'true';
    const categories = searchParams.get('categories') === 'true';

    const skip = (page - 1) * limit;

    let query: any = {};
    if (category) {
      query.category = category;
    }
    // console.log('Query parameters:', { page, limit, category, trending, categories });
    if (trending) {
      query.rating = { $gte: 4.5 };
    }

    if(categories) {
      // Fetch distinct categories with counts
      const categoryStats = await RecipeModel.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          }
        },
        {
          $sort: { count: -1 }
        }
      ]);
      // console.log('Category stats:', categoryStats);
      return NextResponse.json({
        success: true,
        message: 'Categories fetched successfully',
        data: categoryStats.map(stat => ({
            name: stat._id,
            count: stat.count,
            avgRating: Math.round(stat.avgRating * 10) / 10
        })),
      });
    }
    
    // If requesting categories aggregation
    if (category) {
      try {
        const categoryStats = await RecipeModel.aggregate([
          {
            $match: {category: category?.charAt(0).toUpperCase() + category?.slice(1)}
          },
          // {
          //   $group: {
          //     _id: '$category',
          //     count: { $sum: 1 },
          //     // avgRating: { $avg: '$rating' }
          //   }
          // },
          {
            $sort: { count: -1 }
          }
        ]);
        // console.log('Category stats:', categoryStats);
        return NextResponse.json({
          success: true,
          message: 'Categories fetched successfully',
          data: categoryStats,
        });
      } catch (aggregateError) {
        console.error('Aggregation error:', aggregateError);
        return NextResponse.json(
          {
            success: false,
            message: 'Failed to aggregate categories',
          },
          { status: 500 }
        );
      }
    }

    let sortOption: any = { createdAt: -1 };
    if (trending) {
      sortOption = { rating: -1, createdAt: -1 };
    }

    const recipes = await RecipeModel.find(query)
      .sort(sortOption)
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

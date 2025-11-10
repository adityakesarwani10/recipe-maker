import { NextRequest, NextResponse } from 'next/server';
import {dbconnect} from '@/lib/dbconnect';
import RecipeModel from '@/model/recipe.model';
import { use } from 'react';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await dbconnect();

    const { slug } = await params;

    const recipe = await RecipeModel.findOne({ slug }).select('-__v');

    if (!recipe) {
      return NextResponse.json(
        {
          success: false,
          message: 'Recipe not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: recipe,
    });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch recipe',
      },
      { status: 500 }
    );
  }
}

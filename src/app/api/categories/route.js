import Category from "@/models/Category";
import mongooseConnect from "@/utils/mongooseConnect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await mongooseConnect();
    const categories = await Category.find();

    return new NextResponse(JSON.stringify(categories));
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newCategory = new Category(body);

  try {
    await mongooseConnect();
    await newCategory.save();

    return new NextResponse(`${body} has been created`, {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(`Database Error!`, { status: 500 });
  }
};

export const DELETE = async (request) => {
  try {
    await mongooseConnect();
    await Category.deleteMany();

    return new NextResponse("All Categories has been deleted!", {
      status: 201,
    });
  } catch (error) {
    return new NextResponse("Database Error!", {
      status: 500,
    });
  }
};

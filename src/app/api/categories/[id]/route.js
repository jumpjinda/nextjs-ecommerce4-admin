import Category from "@/models/Category";
import mongooseConnect from "@/utils/mongooseConnect";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await mongooseConnect();
    await Category.findByIdAndDelete({ _id: id });

    return new NextResponse("Category has been deleted!", { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error!", { status: 500 });
  }
};

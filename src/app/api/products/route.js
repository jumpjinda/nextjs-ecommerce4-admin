import Product from "@/models/Product";
import mongooseConnect from "@/utils/mongooseConnect";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await mongooseConnect();
    const products = await Product.find();

    return new NextResponse(JSON.stringify(products));
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const POST = async (request) => {
  const body = await request.json();
  const newProduct = new Product(body);

  try {
    await mongooseConnect();
    await newProduct.save();
    return new NextResponse(`${newProduct.title} has been created`, {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err);
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await mongooseConnect();
    await Product.deleteMany();
    return new NextResponse("All products has been deleted", { status: 201 });
  } catch (err) {
    return new NextResponse(err);
  }
};

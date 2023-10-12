import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    /*     const { userId } = auth()

    if(!userId) {
      return new NextResponse('Not authorized', { status: 401 })
    }
 */
    if (!params.productId) {
      return new NextResponse('productId is required', { status: 400 });
    }

    const result = await prismadb.product.findUnique({
      where: { id: params.productId },
    });

    if (result === null) {
      return new NextResponse('No product found', { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    /*     const { userId } = auth();

    if(!userId) {
      return new NextResponse('Not authorized', { status: 401 })
    } */

    if (!params.productId) {
      return new NextResponse('productId is required', { status: 400 });
    }

    const result = await prismadb.product.delete({
      where: { id: params.productId },
    });
    const resName = result.name;
    return NextResponse.json(`${resName} is deleted`, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    /*  const { userId } = auth(); */

    interface Body {
      name: string;
      images: string;
      categoryId: string;
      price: number;
      isFeatured: boolean;
      isArchived: boolean;
      sizeId: string;
      colorId: string;
    }

    const {
      name,
      images,
      categoryId,
      price,
      isFeatured,
      isArchived,
      sizeId,
      colorId,
    }: Body = await req.json();

    /*     if(!userId) {
      return new NextResponse('Not authorized', { status: 401 })
    } */

    if (!params.productId) {
      return new NextResponse('productId is required', { status: 400 });
    }

    const result = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        name,
        images,
        categoryId,
        price,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

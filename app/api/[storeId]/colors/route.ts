import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json({ error: 'StoreId is required', status: 400 });
    }

    interface Body {
      name: string;
      value: string;
    }

    const { name, value }: Body = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required and has to be a string' },
        { status: 400 },
      );
    }

    if (!value) {
      return NextResponse.json(
        { error: 'Value is required and has to be hex code' },
        { status: 400 },
      );
    }

    const result = await prismadb.color.create({
      data: {
        name,
        storeId,
        value,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;
      return NextResponse.json({ errorMessage }, { status: 400 });
    } else if (err.code === 'P2002') {
      return NextResponse.json({ err }, { status: 409 });
    } else {
      return NextResponse.json({ err }, { status: 500 });
    }
  }
}

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json(
        { error: 'StoreId is required' },
        { status: 400 },
      );
    }

    const colors = await prismadb.color.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(colors, { status: 200 });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;

      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}

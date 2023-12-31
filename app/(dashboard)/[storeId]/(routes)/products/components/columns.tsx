'use client';

import { CellAction } from '@/components/cell-actions';
import { ColumnDef } from '@tanstack/react-table';

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string | undefined;
  size: string | undefined;
  color: string | undefined;
  colorValue: string | undefined;
  isFeatured: boolean;
  isArchived: boolean;
  created: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className="flex items-center justify-between gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.colorValue }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'created',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction route={'products'} id={row.original.id} />,
  },
];

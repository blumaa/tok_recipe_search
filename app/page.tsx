"use client"
import React, { useState, useMemo } from 'react'

import recipesData from './recipes.json';
import Header from './Header';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

type Recipe = {
  name: string;
  ingredients: string;
  effect: string;
  recipeNumber: number;
};

const defaultData: Recipe[] = recipesData;

const columnHelper = createColumnHelper<Recipe>()

const columns = [
  columnHelper.accessor('name', {
    cell: info => <div className="pl-2">{info.getValue()}</div>,
    header: () => <div className="pl-2">Name</div>,
  }),
  columnHelper.accessor("ingredients", {
    cell: info => info.getValue().split('\n').map((item, index) => <div key={index}>{item}</div>),
    header: () => 'Ingredients',
  }),
  columnHelper.accessor('effect', {
    header: () => 'Effect',
    cell: info => info.renderValue(),
  }),
]

export default function Page() {
  const [ingredientsFilter, setIngredientsFilter] = useState('');
  const [effectFilter, setEffectFilter] = useState('');

  const filteredData = useMemo(() => {
    return defaultData.filter(recipe =>
      recipe.ingredients.toLowerCase().includes(ingredientsFilter.toLowerCase()) &&
      recipe.effect.toLowerCase().includes(effectFilter.toLowerCase())
    );
  }, [ingredientsFilter, effectFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Header
        ingredientsFilter={ingredientsFilter}
        setIngredientsFilter={setIngredientsFilter}
        effectFilter={effectFilter}
        setEffectFilter={setEffectFilter}
      />
      <div className="divide-y divide-gray-300">
        {table.getHeaderGroups().map(headerGroup => (
          <div key={headerGroup.id} className="bg-gray-200 min-w-full lg:grid lg:grid-cols-3 gap-4">
            {headerGroup.headers.map(header => (
              <div key={header.id} className="py-3 text-left text-xs font-medium text-gray-800">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </div>
            ))}
          </div>
        ))}
        {table.getRowModel().rows.map(row => (
          <div key={row.id} className="bg-white divide-y divide-gray-200 min-w-full lg:grid lg:grid-cols-3 gap-4">
            {row.getVisibleCells().map(cell => (
              <div key={cell.id} className="py-1">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
      <footer className="flex justify-end">
        <div className="text-xs text-slate-600 p-4">© 2024 <a href="mailto:blumaa@gmail.com" className="hover:text-sky-600 hover:underline">Aaron Blum</a></div>
      </footer>
    </div>
  )
}


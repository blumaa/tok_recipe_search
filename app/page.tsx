"use client"
import React, { useState, useMemo } from 'react'

import recipesData from './recipes.json';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Header from './Header';

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
    cell: info => info.getValue(),
    header: () => 'Name',
  }),
  columnHelper.accessor("ingredients", {
    cell: info => info.getValue(),
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

      <div className='px-2'>
        <table className="min-w-full divide-y divide-gray-300" >
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}
                    className="py-3 text-left text-xs font-medium text-gray-800 "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" >
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}
                    className="py-1 "
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="flex justify-end">
        <div className="text-xs text-slate-600 p-4">© 2024 <a href="mailto:blumaa@gmail.com" className="hover:text-sky-600 hover:underline">Aaron Blum</a></div>
      </footer>

    </div>
  )
}


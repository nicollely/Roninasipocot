"use client"
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type InventoryColumn = {
    id: string | number
    name: string
    stocks: number
    createdAt?: Date
    updatedAt?: Date
}

export const columns: ColumnDef<InventoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Item",
        size: 2500
    },
    {
        accessorKey: "stocks",
        header: "Stock",
        size: 50
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return <CellAction data={row.original} />;
        },
        size: 10
    }
]
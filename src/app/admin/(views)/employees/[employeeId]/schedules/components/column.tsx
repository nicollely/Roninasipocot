"use client"
import { CellAction } from "./cell-action"
import { Rooms } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type EmployeeScheduleColumn = {
    id: string;
    employeeId: string;
    date: Date;
    roomId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    room: Rooms;
};

export const columns: ColumnDef<EmployeeScheduleColumn>[] = [
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            return <div>{ format(row.getValue("date"), "MMM dd, yyyy hh:mm a")}</div>
        }
    },
    {
        accessorKey: "room",
        header: "Room",
        cell: ({ row }) => {
            return <div>{row.original.room.name}</div>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
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
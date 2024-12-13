import Heading from "@/components/globals/heading";
import { buttonVariants } from "@/components/ui/button";
import db from "@/lib/db";
import Link from "next/link";
import { EmployeeScheduleColumn } from "./components/column";
import EmployeeScheduleClient from "./components/client";
import { Rooms } from "@prisma/client";
import { getEmployeeSchedules } from "@/actions/employees";

const EmployeeSchedulesPage = async({ params }: {params: {employeeId: string}}) => {
    const employee = await db.employees.findUnique({
      where: {
        id: params.employeeId,
      },
    });

    const employeeSchedules = await getEmployeeSchedules(params.employeeId);

    if ("error" in employeeSchedules) {
      // handle the error case
      console.error(employeeSchedules.error);
      return;
    }

    const formattedData: EmployeeScheduleColumn[] = employeeSchedules.map(
      (item) => ({
        id: item.id,
        employeeId: item.employeeId,
        date: item.date,
        roomId: item.roomId,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        room: item.room as Rooms,
      })
    );

    return (
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <div className="flex items-center justify-between space-y-2">
                <Heading
                    title='Employee Schedules'
                    description={`Here's a list of schedules for ${employee?.firstName} ${employee?.lastName}`}
                />
                <div className="flex items-center space-x-2">
                    <Link
                        href={`/admin/employees/${employee?.id}/schedules/new`}
                        className={buttonVariants({ size: "sm" })}
                    >
                        + Add Schedule
                    </Link>
                </div>
            </div>
            <EmployeeScheduleClient data={formattedData} />
        </div>
    );
};

export default EmployeeSchedulesPage;
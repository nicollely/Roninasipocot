import EmployeeScheduleForm from "@/components/forms/employeeschedule-form";
import { EmployeeScheduleColumn } from "../components/column";
import db from "@/lib/db";
import { getSchedule } from "@/actions/schedules";

const EmployeeSchedulePage = async ({
  params,
}: {
  params: { scheduleId: string };
}) => {
    const schedule = await getSchedule(params.scheduleId);
    const rooms = await db.rooms.findMany();
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
        <EmployeeScheduleForm initialData={schedule as unknown as EmployeeScheduleColumn} rooms={rooms}/>
        </div>
    );
};

export default EmployeeSchedulePage;

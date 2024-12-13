import EmployeeScheduleForm from "@/components/forms/employeeschedule-form";
import db from "@/lib/db";
import { EmployeeScheduleColumn } from "../components/column";

const EmployeeSchedulePage = async ({ params }: { params: { scheduleId: string } }) => {
    const schedule = await db.employeeSchedule.findUnique({
        where: {
            id: params.scheduleId,
        },
    })


    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <EmployeeScheduleForm initialData={schedule as EmployeeScheduleColumn}/>
        </div>
    );
};

export default EmployeeSchedulePage;
/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "@/lib/db";
import { EmployeeScheduleFormValidation } from "@/lib/validators";
import { z } from "zod";

export const getSchedule = async (scheduleId: string) => {
  try {
    const schedule = await db.employeeSchedule.findUnique({
      where: {
        id: scheduleId,
      },
      include: {
          room: true
      }
    });
    return schedule; //what is this
  } catch (error: any) {
    return {
      error: `Failed to get schedule. Please try again. ${error.message || ""}`,
    };
  }
};

export const deleteSchedule = async (scheduleId: string) => {
    try {
        await db.employeeSchedule.delete({
            where: {
                id: scheduleId,
            },
        });
        return { success: "Schedule deleted successfully" };
    } catch (error: any) {
        return {
            error: `Failed to delete schedule. Please try again. ${error.message || ""}`,
        };
    }
}

export const updateSchedule = async (scheduleId: string, values: z.infer<typeof EmployeeScheduleFormValidation>) => {
    const validatedField = EmployeeScheduleFormValidation.safeParse(values);

    if (!validatedField.success) {
        const errors = validatedField.error.errors.map((err) => err.message);
        return { error: `Validation Error: ${errors.join(", ")}` };
    }

    try {
        const schedule = await db.employeeSchedule.update({
            where: {
                id: scheduleId,
            },
            data: {
                date: validatedField.data.date,
                status: validatedField.data.status,
                roomId: validatedField.data.room.id
            }
        });
        return { success: "Schedule updated successfully", schedule };
    } catch (error: any) {
        return {
            error: `Failed to update schedule. Please try again. ${error.message || ""}`,
        };
    }
}

export const createSchedule = async (values: z.infer<typeof EmployeeScheduleFormValidation>, employeeId: string) => {
    const validatedField = EmployeeScheduleFormValidation.safeParse(values);

    if (!validatedField.success) {
        const errors = validatedField.error.errors.map((err) => err.message);
        
        return { error: `Validation Error: ${errors.join(", ")}` };
    }

    try {
        const schedule = await db.employeeSchedule.create({
            data: {
                date: validatedField.data.date,
                status: validatedField.data.status,
                employeeId: employeeId,
                roomId: validatedField.data.room.id
            }
        });
        return { success: "Schedule created successfully", schedule };
    } catch (error: any) {
        return {
            error: `Failed to create schedule. Please try again. ${error.message || ""}`,
        };
    }
}
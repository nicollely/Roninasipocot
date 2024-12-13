"use client";
import Heading from "../globals/heading"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { CalendarIcon, Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmployeeScheduleFormValidation } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeScheduleColumn } from "@/app/admin/(views)/employees/[employeeId]/schedules/components/column";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import {  } from "@radix-ui/react-select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../globals/custom-calendar";
import { DATE_DEFAULT_FORMAT, DATE_DISPLAY_FORMAT, DATE_YEAR_MIN } from "@/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Rooms } from "@prisma/client";
import { Input } from "../ui/input";
import AlertModal from "../ui/alert-modal";
import { deleteSchedule, updateSchedule } from "@/actions/schedules";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { createSchedule } from "@/actions/employees";

interface EmployeeScheduleFormProps {
  initialData: EmployeeScheduleColumn,
  rooms: Rooms[]
}

const EmployeeScheduleForm: React.FC<EmployeeScheduleFormProps> = ({
  initialData,
  rooms
}) => {
  const [isOpen, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams()
  const router = useRouter();

  const form = useForm<z.infer<typeof EmployeeScheduleFormValidation>>({
    resolver: zodResolver(EmployeeScheduleFormValidation),
    defaultValues: initialData ? {
      date: format(initialData.date, DATE_DEFAULT_FORMAT),
      room: initialData.room,
    } : {
        date: format(new Date(), DATE_DEFAULT_FORMAT),
        room: {} as Rooms
    }
  })

  const onSubmit = async (data: z.infer<typeof EmployeeScheduleFormValidation>) => {
    console.table(params.employeeId);
    setIsLoading(true)
    if (initialData) {
      updateSchedule(params.scheduleId as string, data)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/admin/employees/" + params.employeeId + "/schedules");
          } else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      createSchedule({
        date: data.date.toString(),
        status: data.status,
        room: data.room,
      }, params.employeeId as string)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/admin/employees/" + params.employeeId + "/schedules");
          } else {
            toast.error(data.error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const onDelete = async () => {
    setIsLoading(true);
    deleteSchedule(initialData.id as string)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
          setOpen(false);
          router.push("/admin/employees/" + params.employeeId + "/schedules");

        } else {
          toast.error(data.error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        loading={isLoading}
        onConfirm={onDelete}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center justify-between">
            <Heading
              title={
                initialData
                  ? "Edit Employee Schedule"
                  : "Create Employee Schedule"
              }
              description={
                initialData
                  ? "Updates the schedule for this employee"
                  : "Creates a schedule for this employee"
              }
            />
            <div className="md:flex hidden items-center space-x-2">
              {initialData && (
                <Button
                  onClick={() => setOpen(true)}
                  variant="outline"
                  size="sm"
                  type="button"
                >
                  Discard
                </Button>
              )}
              <Button type="submit" disabled={isLoading} size="sm">
                {isLoading && <Loader className="animate-spin w-4 h-4 mr-2" />}
                {initialData ? "Update" : "Create"}
              </Button>
            </div>
          </div>
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Scheduled Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "flex w-full pl-2 justify-start font-normal focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-4 h-4 w-4" />
                          {field.value ? (
                            format(field.value, DATE_DISPLAY_FORMAT)
                          ) : (
                            <span>Select Scheduled Date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          date &&
                          field.onChange(format(date, DATE_DEFAULT_FORMAT))
                        }
                        fromYear={DATE_YEAR_MIN}
                        toYear={new Date().getFullYear()}
                        disabled={(date) => date <= new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.name}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Room" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}

export default EmployeeScheduleForm
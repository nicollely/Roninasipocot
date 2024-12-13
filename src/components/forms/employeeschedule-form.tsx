"use client";
import Heading from "../globals/heading"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { CalendarIcon, Loader, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmployeeScheduleFormValidation } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeScheduleColumn } from "@/app/admin/(views)/employees/[employeeId]/schedules/components/column";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../globals/custom-calendar";
import { DATE_DEFAULT_FORMAT, DATE_DISPLAY_FORMAT, DATE_YEAR_MIN } from "@/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface EmployeeScheduleFormProps {
    initialData: EmployeeScheduleColumn
}

const EmployeeScheduleForm: React.FC<EmployeeScheduleFormProps> = ({
    initialData,
}) => {
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof EmployeeScheduleFormValidation>>({
      resolver: zodResolver(EmployeeScheduleFormValidation)
    });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => {})} className="space-y-4">
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
          {/* <FormField
            control={form.control}
            name="room"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Room</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={`${!field.value ? "text-zinc-400" : ""}`}
                    >
                      <SelectValue placeholder="Select Assigned Room" />
                    </SelectTrigger>
                    <SelectContent className="">
                      {data.rooms.map((room) => (
                        <SelectItem value={room.id} key={data.id}>
                          {room.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </form>
      </Form>
    </>
  );
}

export default EmployeeScheduleForm
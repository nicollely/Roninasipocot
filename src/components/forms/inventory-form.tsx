'use client';
import { InventoryFormValidation } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inventory } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useState } from "react";
import { Input } from "../ui/input";
import Heading from "../globals/heading";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import AlertModal from "../ui/alert-modal";
import { updateInventoryItem, deleteInventoryItem, createInventoryItem } from "@/actions/inventory";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

interface InventoryFormProps {
    initialData?: Inventory ;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ initialData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const params = useParams();
    const router = useRouter();
    
    const form = useForm<z.infer<typeof InventoryFormValidation>>({
        resolver: zodResolver(InventoryFormValidation),
        defaultValues: initialData
            ? {
                ...initialData,
                stocks: initialData.stocks.toString(),
              }
            : {
                name: "",
                stocks: "",
            },
    });
    
    const onSubmit = async (data: z.infer<typeof InventoryFormValidation>) => {
        setIsLoading(true);
        if (initialData) {
            updateInventoryItem(params.inventoryId as string, data)
                .then((data) => {
                if (data.success) {
                    toast.success(data.success);
                    router.push("/admin/inventory");
                } else {
                    toast.error(data.error);
                }
                })
                .finally(() => {
                setIsLoading(false);
                });
        } else {
            createInventoryItem(data)
                .then((data) => {
                if (data.success) {
                    toast.success(data.success);
                    router.push("/admin/inventory");
                } else {
                    toast.error(data.error);
                }
                })
                .finally(() => {
                setIsLoading(false);
                });
        }
    };


    const onDelete = async () => {
        setIsLoading(true);
        deleteInventoryItem(params.inventoryId as string)
            .then((data) => {
            if (data.success) {
                toast.success(data.success);
                setOpen(false);
                router.push("/admin/inventory");
            } else {
                toast.error(data.error);
            }
            })
            .finally(() => {
            setIsLoading(false);
            });
        };
    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                loading={isLoading}
                onConfirm={onDelete}
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="flex items-center justify-between">
                        <Heading title={initialData ? "Update Item" : "Add Item"} description={initialData ? "Update Item to Inventory" : "Add Item to Inventory"} />
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
                        name="name"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter item name"
                                        className=""
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="stocks"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stocks</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter item stocks"
                                        className=""
                                        {...field}
                                        type="number"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </>
    );
};

export default InventoryForm;

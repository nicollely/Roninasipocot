/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from '@/lib/db';
import { InventoryFormValidation } from '@/lib/validators';
import { z } from 'zod';
// import { InventoryFormValidation } from '@/lib/validators';
// import { z } from 'zod';

export const getInventoryItems = async () => {
    try { 
        const inventoryItems = await db.inventory.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return { success: "Inventory Items displayed successfully!", inventoryItems };

    } catch (error: any) {
        return {
            error: `Failed to display inventory items. Please try again. ${error.message || ""}`,
        };
    }
}

export const createInventoryItem = async (values: z.infer<typeof InventoryFormValidation>) => {
    const validatedField = InventoryFormValidation.safeParse(values);

    if (!validatedField.success) {
        const errors = validatedField.error.errors.map((err) => err.message);
        return { error: `Validation Error: ${errors.join(", ")}` };
    }

    const {
        name,
        stocks,
    } = validatedField.data

    try {
        const inventoryItem = await db.inventory.create({
            data: {
                name,
                stocks,
            },
        });

        return { success: "Inventory Item created successfully!", inventoryItem };
    } catch (error: any) {
        return {
            error: `Failed to create inventory item. Please try again. ${error.message || ""}`,
    }
    }
}

export const updateInventoryItem = async (inventoryId: string, values: z.infer<typeof InventoryFormValidation>) => {
    const validatedField = InventoryFormValidation.safeParse(values);

    if (!validatedField.success) {
        const errors = validatedField.error.errors.map((err) => err.message);
        return { error: `Validation Error: ${errors.join(", ")}` };
    }

    const {
        name,
        stocks,
    } = validatedField.data

    try {
        await db.inventory.update({
            where: {
                id: inventoryId,
            },
            data: {
                name,
                stocks,
            },
        });

        return { success: "Inventory Item updated successfully!" };
    } catch (error: any) {
        return {
            error: `Failed to update inventory item. Please try again. ${error.message || ""}`,
        };
    }
}

export const deleteInventoryItem = async (inventoryId: string) => {
    try {
        await db.inventory.delete({
            where: {
                id: inventoryId,
            },
        });
        return { success: "Inventory Item deleted successfully!" };
    } catch (error: any) {
        return {
            error: `Failed to delete inventory item. Please try again. ${error.message || ""}`,
        };
    }
}
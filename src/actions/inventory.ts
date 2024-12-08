/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from '@/lib/db';
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
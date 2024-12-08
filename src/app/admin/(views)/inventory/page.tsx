import Heading from '@/components/globals/heading'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import InventoryClient from './components/client'
import { InventoryColumn } from './components/column'
import db from '@/lib/db'




const Inventory = async () => {
    const inventoryItems = await db.inventory.findMany({
        orderBy: {
            name: "desc",
        }
    })

    const formattedData: InventoryColumn[] = inventoryItems.map((item) => ({
        id: String(item.id),
        name: item.name,
        stocks: Number(item.stocks)
        
    }));
    return (
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <div className="flex items-center justify-between space-y-2">
                <Heading
                    title={`Inventory`}
                    description="Here's a list of your inventory in your hotel!"
                />
                <div className="flex items-center space-x-2">
                    <Link
                        href="/admin/inventory/new"
                        className={buttonVariants({ size: "sm" })}
                    >
                        + Add Inventory Item
                    </Link>
                </div>
            </div>
            <InventoryClient data={formattedData} />
        </div>
  )
}

export default Inventory

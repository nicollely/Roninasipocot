import React, { useRef } from 'react'
import { Modal } from '../ui/modal'
import InventoryForm, { InventoryFormRef } from '../forms/inventory-form'
import { Inventory } from '@prisma/client'
import { Button } from '../ui/button'

interface InventoryModalProps { 
    update?: boolean
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean,
    data?: Inventory
}

const InventoryModal: React.FC<InventoryModalProps> = ({
    update,
    isOpen,
    onClose,
    onConfirm,
    loading,
    data
}) => {
    const formRef = useRef<InventoryFormRef>(null)

    const handleSubmit = async () => {
        if (formRef.current) {
            try {
                await formRef.current.submitForm(); // Await the async form submission
                onConfirm(); // Call onConfirm after successful submission
            } catch (error) {
                console.error("Error submitting form:", error);
                // Handle any errors if needed (e.g., show an error message)
            }
        }
    }
  return (
    <Modal
        title={`${update ? "Update" : "Add"} Item to Inventory`}
        isOpen={isOpen}
        onClose={onClose}
        description='Please fill out the form below.'
    >
        <InventoryForm initialData={data} /> 
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancel
        </Button>
        <Button disabled={loading} variant="default" onClick={handleSubmit}>
            Submit {/* calll the onSubmit function */}
        </Button>
      </div>
    </Modal>
  )
}

export default InventoryModal
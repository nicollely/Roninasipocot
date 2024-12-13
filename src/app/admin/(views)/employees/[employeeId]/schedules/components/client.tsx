import { DataTable } from "@/components/ui/data-table"
import { EmployeeScheduleColumn, columns } from "./column"

interface EmployeeScheduleClientProps {
    data: EmployeeScheduleColumn[]
}

const EmployeeScheduleClient: React.FC<EmployeeScheduleClientProps> = ({ data }) => {
    return (
        <>
            <DataTable searchKey="name" columns={columns} data={data} />
        </>
    )
}

export default EmployeeScheduleClient
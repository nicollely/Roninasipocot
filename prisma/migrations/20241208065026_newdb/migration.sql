-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "sex" TEXT,
    "address" TEXT,
    "birthdate" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imagesUrl" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'Available',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomFeature" (
    "id" TEXT NOT NULL,
    "numberOfPerson" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "RoomFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imagesUrl" TEXT[],
    "stock" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderFood" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "foodId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OrderFood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inclusions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inclusions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Catering" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "stock" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Catering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CateringFeature" (
    "id" TEXT NOT NULL,
    "numberOfPerson" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "cateringId" TEXT NOT NULL,

    CONSTRAINT "CateringFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AddOns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "cateringId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AddOns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "civilStatus" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dateHired" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "daysPresent" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "sss" DOUBLE PRECISION NOT NULL,
    "philhealth" DOUBLE PRECISION NOT NULL,
    "pagibig" DOUBLE PRECISION NOT NULL,
    "bir" DOUBLE PRECISION NOT NULL,
    "otherDeductions" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "timeIn" TEXT NOT NULL,
    "timeOut" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeSchedule" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventsInclusions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventsInclusions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventsFeature" (
    "id" TEXT NOT NULL,
    "numberOfPerson" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventsFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventsAddOns" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "eventId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventsAddOns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomAppointments" (
    "id" TEXT NOT NULL,
    "checkIn" TEXT NOT NULL,
    "checkOut" TEXT NOT NULL,
    "guest" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "proofOfPayment" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "RoomAppointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stocks" BIGINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomAmenities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RoomAmenities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CateringInclusions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CateringInclusions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CateringMenus" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CateringMenus_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AttendanceToPayroll" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AttendanceToPayroll_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EventsInclusions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventsInclusions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_EventMenus" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventMenus_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Rooms_id_key" ON "Rooms"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RoomFeature_id_key" ON "RoomFeature"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Amenities_id_key" ON "Amenities"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Food_id_key" ON "Food"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrderFood_id_key" ON "OrderFood"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Inclusions_id_key" ON "Inclusions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Catering_id_key" ON "Catering"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CateringFeature_id_key" ON "CateringFeature"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AddOns_id_key" ON "AddOns"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_id_key" ON "Employees"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_email_key" ON "Employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payroll_id_key" ON "Payroll"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_id_key" ON "Attendance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeSchedule_id_key" ON "EmployeeSchedule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventsInclusions_id_key" ON "EventsInclusions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Events_id_key" ON "Events"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventsFeature_id_key" ON "EventsFeature"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventsAddOns_id_key" ON "EventsAddOns"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RoomAppointments_id_key" ON "RoomAppointments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_id_key" ON "Inventory"("id");

-- CreateIndex
CREATE INDEX "_RoomAmenities_B_index" ON "_RoomAmenities"("B");

-- CreateIndex
CREATE INDEX "_CateringInclusions_B_index" ON "_CateringInclusions"("B");

-- CreateIndex
CREATE INDEX "_CateringMenus_B_index" ON "_CateringMenus"("B");

-- CreateIndex
CREATE INDEX "_AttendanceToPayroll_B_index" ON "_AttendanceToPayroll"("B");

-- CreateIndex
CREATE INDEX "_EventsInclusions_B_index" ON "_EventsInclusions"("B");

-- CreateIndex
CREATE INDEX "_EventMenus_B_index" ON "_EventMenus"("B");

-- AddForeignKey
ALTER TABLE "RoomFeature" ADD CONSTRAINT "RoomFeature_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderFood" ADD CONSTRAINT "OrderFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderFood" ADD CONSTRAINT "OrderFood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CateringFeature" ADD CONSTRAINT "CateringFeature_cateringId_fkey" FOREIGN KEY ("cateringId") REFERENCES "Catering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddOns" ADD CONSTRAINT "AddOns_cateringId_fkey" FOREIGN KEY ("cateringId") REFERENCES "Catering"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSchedule" ADD CONSTRAINT "EmployeeSchedule_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeSchedule" ADD CONSTRAINT "EmployeeSchedule_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsFeature" ADD CONSTRAINT "EventsFeature_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventsAddOns" ADD CONSTRAINT "EventsAddOns_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAppointments" ADD CONSTRAINT "RoomAppointments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAppointments" ADD CONSTRAINT "RoomAppointments_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomAmenities" ADD CONSTRAINT "_RoomAmenities_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomAmenities" ADD CONSTRAINT "_RoomAmenities_B_fkey" FOREIGN KEY ("B") REFERENCES "Rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CateringInclusions" ADD CONSTRAINT "_CateringInclusions_A_fkey" FOREIGN KEY ("A") REFERENCES "Catering"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CateringInclusions" ADD CONSTRAINT "_CateringInclusions_B_fkey" FOREIGN KEY ("B") REFERENCES "Inclusions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CateringMenus" ADD CONSTRAINT "_CateringMenus_A_fkey" FOREIGN KEY ("A") REFERENCES "Catering"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CateringMenus" ADD CONSTRAINT "_CateringMenus_B_fkey" FOREIGN KEY ("B") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToPayroll" ADD CONSTRAINT "_AttendanceToPayroll_A_fkey" FOREIGN KEY ("A") REFERENCES "Attendance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttendanceToPayroll" ADD CONSTRAINT "_AttendanceToPayroll_B_fkey" FOREIGN KEY ("B") REFERENCES "Payroll"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsInclusions" ADD CONSTRAINT "_EventsInclusions_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventsInclusions" ADD CONSTRAINT "_EventsInclusions_B_fkey" FOREIGN KEY ("B") REFERENCES "EventsInclusions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventMenus" ADD CONSTRAINT "_EventMenus_A_fkey" FOREIGN KEY ("A") REFERENCES "Events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventMenus" ADD CONSTRAINT "_EventMenus_B_fkey" FOREIGN KEY ("B") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

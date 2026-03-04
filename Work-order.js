
const documents = [

    // -------------------------
    // WORK CENTER
    // -------------------------
    {
      docId: "wc-1",
      docType: "workCenter",
      data: {
        name: "Extrusion Line 1",
  
        shifts: [
          { dayOfWeek: 1, startHour: 8, endHour: 17 }, // Monday
          { dayOfWeek: 2, startHour: 8, endHour: 17 }, // Tuesday
          { dayOfWeek: 3, startHour: 8, endHour: 17 }, // Wednesday
          { dayOfWeek: 4, startHour: 8, endHour: 17 }, // Thursday
          { dayOfWeek: 5, startHour: 8, endHour: 17 }  // Friday
        ],
  
        maintenanceWindows: [
          {
            startDate: "2026-03-10T12:00:00Z",
            endDate: "2026-03-10T14:00:00Z",
            reason: "Routine line inspection"
          }
        ]
      }
    },
  
  
    // -------------------------
    // MANUFACTURING ORDER
    // -------------------------
    {
      docId: "mo-1",
      docType: "manufacturingOrder",
      data: {
        manufacturingOrderNumber: "MO-1001",
        itemId: "PIPE-6IN",
        quantity: 5000,
        dueDate: "2026-03-15T00:00:00Z"
      }
    },
  
  
    // -------------------------
    // WORK ORDER A
    // -------------------------
    {
      docId: "wo-1",
      docType: "workOrder",
      data: {
        workOrderNumber: "WO-A",
        manufacturingOrderId: "mo-1",
        workCenterId: "wc-1",
  
        startDate: "2026-03-10T08:00:00Z",
        endDate: "2026-03-10T10:00:00Z",
  
        durationMinutes: 120,
  
        isMaintenance: false,
  
        dependsOnWorkOrderIds: []
      }
    }
]



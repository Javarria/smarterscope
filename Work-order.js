
// VITAL DATA THAT NEEDS TO BE EXTRACTED OUTLINE : 
//     workOrderById: Map<string, WorkOrder> // ID of Work Order
//     workCenterById: Map<string, WorkCenter> // ID of workCenter
//     childrenByParent: Map<string, string[]> (reverse dependency graph) // WHO Depends On THIS Work Order 
//     inDegree: Map<string, number> (dependency count) //Dependecy Count Of This WO
//     immutableWO: Set<string> // (isMaintenance === true) 
//     scheduleByWorkCenter: Map<workCenterId, WorkOrder[]> { key→ machine id : value→ array of work orders running on that machine }
//      sorted by startDate Also convert all startDate/endDate to Luxon DateTime once.

const WORKSCHEDULE = () => {


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

function VitalInfoForWorkOrder() {
    //iterate through documents
    documents.forEach((document) => {
      //checking if doctype is 'work order' IE: HAS ALL INFORMATION for VITAL Object
    //   if (document.docType === "workOrder") {
    //     const vital = vitalInfoForWorkOrder(document);
    //     workOrderById.set(vital.id, vital);
    //   }

    console.log(document)
    });
  }
console.log("HRLLO")
  
VitalInfoForWorkOrder(WORKSCHEDULE.documents)

//CURRENTLY ITERATING THROUGH DOCUMENTS BUT YET TO EXTRACT IMPORTANT DATA 

// VITAL DATA THAT NEEDS TO BE EXTRACTED OUTLINE : 
//     workOrderById: Map<string, WorkOrder> // ID of Work Order
//     workCenterById: Map<string, WorkCenter> // ID of workCenter
//     childrenByParent: Map<string, string[]> (reverse dependency graph) // WHO Depends On THIS Work Order 
//     inDegree: Map<string, number> (dependency count) //Dependecy Count Of This WO
//     immutableWO: Set<string> // (isMaintenance === true) 
//     scheduleByWorkCenter: Map<workCenterId, WorkOrder[]> { key→ machine id : value→ array of work orders running on that machine }
//      sorted by startDate Also convert all startDate/endDate to Luxon DateTime once.

}

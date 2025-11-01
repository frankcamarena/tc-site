// src/data/ChecklistData.js

export const CHECKLIST_DATA = {
  standard: {
    title: "Standard Cleaning Checklist",
    list: [
      { 
        category: "Bedrooms & Living Areas", 
        items: [
          "Dust and wipe table-top surfaces",
          "Sweep and mop floors",
          "Vacuum carpets",
          "Clean mirrors",
          "Dust furniture",
          "Clean hallways and staircases",
          "Empty bins"
        ]
      },
      { 
        category: "Kitchen", 
        items: [
          "Dust and wipe table-top surfaces",
          "Clean and shine sink",
          "Sweep and mop floors",
          "Clean and wipe appliances (exterior)",
          "Clean stovetop",
          "Empty bins"
        ]
      },
      { 
        category: "Bathrooms", 
        items: [
          "Wipe and sanitize all surfaces",
          "Clean and shine sink",
          "Clean mirrors",
          "Clean and sanitize toilets",
          "Sweep and mop floors",
          "Clean shower faucets",
          "Clean and scrub tub",
          "Empty bins"
        ]
      },
    ],
    note: "Perfect for routine maintenance or weekly/bi-weekly bookings."
  },

  deep: {
    title: "Deep Cleaning Checklist",
    list: [
      { 
        category: "Bedrooms & Living Areas", 
        items: [
          // Items de Standard Clean
          "Dust and wipe table-top surfaces",
          "Sweep and mop floors",
          "Vacuum carpets",
          "Clean mirrors",
          "Dust furniture",
          "Clean hallways and staircases",
          "Empty bins",
          // Adicionales de Deep Clean
          "Clean baseboards",
          "Clean under furniture",
          "Wipe window sills",
          "Clean window frames",
          "Wipe door frames"
        ]
      },
      { 
        category: "Kitchen", 
        items: [
          // Items de Standard Clean
          "Dust and wipe table-top surfaces",
          "Clean and shine sink",
          "Sweep and mop floors",
          "Clean and wipe appliances (exterior)",
          "Clean stovetop",
          "Empty bins",
          // Adicionales de Deep Clean
          "Clean microwave interior",
          "Clean kitchen baseboards",
          "Wipe and clean backsplash",
          "Clean kitchen extractor exterior"
        ]
      },
      { 
        category: "Bathrooms", 
        items: [
          // Items de Standard Clean
          "Wipe and sanitize all surfaces",
          "Clean and shine sink",
          "Clean mirrors",
          "Clean and sanitize toilets",
          "Sweep and mop floors",
          "Clean shower faucets",
          "Clean and scrub tub",
          "Empty bins",
          // Adicionales de Deep Clean
          "Clean bathroom baseboards"
        ]
      },
    ],
    note: "Recommended for first-time cleans or properties not cleaned professionally in 3+ months."
  },
  
  moveInOut: {
    title: "Move In/Out Cleaning Checklist",
    list: [
      { 
        category: "Bedrooms & Living Areas", 
        items: [
          // Items de Deep Clean (casi todos)
          "Dust and wipe table-top surfaces",
          "Sweep and mop floors",
          "Vacuum carpets",
          "Clean mirrors",
          "Dust furniture",
          "Clean hallways and staircases",
          "Empty bins",
          "Clean baseboards",
          "Clean under furniture",
          "Wipe window sills",
          "Clean window frames",
          "Wipe door frames", // Se ha ajustado a tu lista
        ]
      },
      { 
        category: "Kitchen", 
        items: [
          // Items de Deep Clean + Move In/Out
          "Dust and wipe table-top surfaces",
          "Clean and shine sink",
          "Sweep and mop floors",
          "Clean and wipe appliances (exterior)",
          "Clean stovetop",
          "Empty bins",
          // Adicionales de Move In/Out (limpieza interior)
          "Clean cabinets (exterior - interior)",
          "Clean oven (exterior - interior)",
          "Clean microwave (exterior -interior)",
          "Clean refrigerator (exterior - interior)",
          "Clean basebords"
        ]
      },
      { 
        category: "Bathrooms", 
        items: [
          // Items de Deep Clean + Move In/Out
          "Wipe and sanitize all surfaces",
          "Clean and shine sink",
          "Clean mirrors",
          "Clean and sanitize toilets",
          "Sweep and mop floors",
          "Clean shower faucets",
          "Clean and scrub tub",
          "Empty bins",
          // Adicionales de Move In/Out
          "Clean cabinets (interior-exterior)",
          "Clean basebords",
          "Wipe window ledges"
        ]
      },
    ],
    note: "Ideal for landlords, tenants, or real estate agents looking for a spotless transition."
  }
};
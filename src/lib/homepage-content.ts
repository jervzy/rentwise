export const navigationLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#what-we-handle", label: "What We Handle" },
  { href: "#for-landlords", label: "For Landlords" },
  { href: "#service-areas", label: "Areas" },
  { href: "#faqs", label: "FAQs" },
  { href: "#about", label: "About" },
] as const;

export const benefits = [
  "Agreed monthly rent",
  "Reduced void-period uncertainty",
  "Regular property oversight",
  "Day-to-day management handled",
] as const;

export const traditionalManagement = [
  "Unpredictable void periods",
  "Repeated occupant communication",
  "Reactive maintenance coordination",
  "Recurring check-ins and check-outs",
  "Regular reletting administration",
] as const;

export const rentWiseManagement = [
  "Agreed monthly payment",
  "One professional point of contact",
  "Coordinated property oversight",
  "Clearly defined responsibilities",
  "Longer-term management arrangement",
] as const;

export const processStages = [
  {
    title: "Tell us about the property",
    description:
      "Share the postcode, property type, bedroom count and current condition.",
  },
  {
    title: "Property assessment",
    description:
      "Rent Wise visits the property and reviews its location, condition and suitability.",
  },
  {
    title: "Receive a rent proposal",
    description:
      "You receive proposed terms covering the rent, agreement duration and responsibilities.",
  },
  {
    title: "Rent Wise manages the property",
    description:
      "Once the agreement is signed, payments follow the contract while Rent Wise handles the agreed day-to-day management.",
  },
] as const;

export const managementServices = [
  {
    title: "Occupant sourcing and communication",
    description:
      "Rent Wise coordinates occupant enquiries, communication and routine property matters under the agreed management arrangement.",
  },
  {
    title: "Rent administration",
    description:
      "Monthly payments and landlord communication are managed according to the signed agreement.",
  },
  {
    title: "Property inspections",
    description:
      "Planned property inspections help identify maintenance or condition concerns early.",
  },
  {
    title: "Maintenance coordination",
    description:
      "Rent Wise coordinates maintenance issues according to the responsibilities stated in the agreement.",
  },
  {
    title: "Compliance support",
    description:
      "Property documentation and compliance requirements are reviewed as part of onboarding and ongoing management.",
  },
  {
    title: "Check-ins and check-outs",
    description:
      "Occupant arrivals, departures and property-condition records are managed through a structured process.",
  },
  {
    title: "Issue resolution",
    description:
      "Routine concerns and property-management issues are handled through one central point of contact.",
  },
  {
    title: "Landlord updates",
    description:
      "Landlords receive clear updates on important property matters.",
  },
] as const;

export const managementLanes = [
  {
    name: "Occupancy",
    services: [
      managementServices[0],
      managementServices[5],
      managementServices[6],
    ],
  },
  {
    name: "Property care",
    services: [
      managementServices[2],
      managementServices[3],
      managementServices[4],
    ],
  },
  {
    name: "Administration",
    services: [managementServices[1], managementServices[7]],
  },
] as const;

export const serviceAreas = [
  "Reading",
  "Caversham",
  "Tilehurst",
  "Earley",
  "Woodley",
  "Whitley",
  "Calcot",
  "Lower Earley",
  "Surrounding Berkshire areas",
] as const;

export const serviceAreaLocations = [
  { number: "01", name: "Reading", latitude: 51.445, longitude: -0.9685 },
  {
    number: "02",
    name: "Caversham",
    latitude: 51.4681,
    longitude: -0.97389,
  },
  {
    number: "03",
    name: "Tilehurst",
    latitude: 51.460097,
    longitude: -1.040606,
  },
  { number: "04", name: "Earley", latitude: 51.433, longitude: -0.933 },
  {
    number: "05",
    name: "Woodley",
    latitude: 51.45367,
    longitude: -0.90605,
  },
  {
    number: "06",
    name: "Whitley",
    latitude: 51.428056,
    longitude: -0.961111,
  },
  {
    number: "07",
    name: "Calcot",
    latitude: 51.44347,
    longitude: -1.041674,
  },
  {
    number: "08",
    name: "Lower Earley",
    latitude: 51.43045,
    longitude: -0.92799,
  },
] as const;

export const agreementItems = [
  "Proposed monthly rent",
  "Payment date",
  "Agreement duration",
  "Occupancy arrangement",
  "Management responsibilities",
  "Landlord responsibilities",
  "Maintenance responsibilities",
  "Inspection arrangements",
  "Notice terms",
  "Property handback process",
] as const;

export const suitabilityConsiderations = [
  "Reading or surrounding Berkshire location",
  "Suitable residential use",
  "Property condition",
  "Bedroom count and layout",
  "Mortgage and insurance permissions",
  "Licensing requirements",
  "Safety documentation",
  "Local demand",
  "Proposed agreement terms",
] as const;

export const faqItems = [
  {
    id: "guaranteed-rent-meaning",
    question: "What does guaranteed rent mean?",
    answer:
      "Guaranteed rent refers to the agreed payment Rent Wise makes to the landlord under the signed contract. The exact payment terms, duration and conditions are defined in the agreement.",
  },
  {
    id: "monthly-payment-responsibility",
    question: "Who pays the landlord each month?",
    answer:
      "Under the proposed arrangement, Rent Wise is responsible for making the agreed payment to the landlord according to the contract.",
  },
  {
    id: "temporary-empty-period",
    question: "Am I paid when the property is temporarily empty?",
    answer:
      "Where this is included in the signed agreement, the landlord's payment is based on the agreed contract rather than the property's day-to-day occupancy. Exact terms must be confirmed before signing.",
  },
  {
    id: "maintenance-responsibility",
    question: "Who handles maintenance?",
    answer:
      "Rent Wise coordinates reported maintenance and property issues. Responsibility for approving and paying for particular repairs depends on the signed agreement.",
  },
  {
    id: "agreement-length",
    question: "How long are the agreements?",
    answer:
      "Agreement lengths vary depending on the property, the landlord's requirements and the proposed terms.",
  },
  {
    id: "property-types",
    question: "What types of property do you consider?",
    answer:
      "Rent Wise considers suitable residential properties in Reading and surrounding Berkshire areas. Each property is reviewed individually.",
  },
  {
    id: "hmo-management",
    question: "Do you manage HMOs?",
    answer:
      "Potential HMO properties require additional suitability, licensing and compliance checks. Contact Rent Wise to discuss the property before relying on the service.",
  },
  {
    id: "landlord-inspection",
    question: "Can I inspect my property?",
    answer:
      "Inspection and access arrangements are defined in the agreement and must also respect the occupants' legal rights.",
  },
  {
    id: "mortgage-provider-approval",
    question: "Does my mortgage provider need to approve the arrangement?",
    answer:
      "Landlords should confirm that their mortgage, lease and insurance permit the proposed arrangement and any relevant subletting or occupancy model.",
  },
  {
    id: "agreement-end",
    question: "What happens at the end of the agreement?",
    answer:
      "The agreement should clearly define notice requirements, property condition, handback arrangements and any final inspection process.",
  },
  {
    id: "property-acceptance",
    question: "Is every property accepted?",
    answer: "No. Rent Wise assesses each property before making a proposal.",
  },
  {
    id: "rent-before-signing",
    question: "Are the proposed rent figures guaranteed before signing?",
    answer:
      "No. Any initial figure is indicative until the property assessment, due diligence and agreement are complete.",
  },
] as const;

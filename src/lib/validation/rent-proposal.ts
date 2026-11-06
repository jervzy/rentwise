export type ProposalStep = 1 | 2 | 3 | 4;

export type ProposalFieldName =
  | "postcode"
  | "propertyType"
  | "bedrooms"
  | "propertyStatus"
  | "message"
  | "fullName"
  | "email"
  | "telephone"
  | "contactMethod"
  | "consent";

export type ProposalValues = {
  postcode: string;
  propertyType: string;
  bedrooms: string;
  propertyStatus: string;
  message: string;
  fullName: string;
  email: string;
  telephone: string;
  contactMethod: string;
  consent: boolean;
};

export type ProposalFieldErrors = Partial<Record<ProposalFieldName, string>>;

export const PROPOSAL_STEPS = [
  {
    number: 1,
    label: "Property",
    heading: "Tell us about your property",
    description: "Start with the basic property details.",
  },
  {
    number: 2,
    label: "Current situation",
    heading: "What is the property's current status?",
    description:
      "This helps Rent Wise understand its availability and suitability.",
  },
  {
    number: 3,
    label: "Contact details",
    heading: "How should Rent Wise contact you?",
    description:
      "Enter your details so the team can discuss the property with you.",
  },
  {
    number: 4,
    label: "Review",
    heading: "Review your enquiry",
    description:
      "Check the details below before requesting your initial proposal.",
  },
] as const;

export const PROPERTY_TYPES = [
  "Flat",
  "Terraced house",
  "Semi-detached house",
  "Detached house",
  "HMO",
  "Other",
] as const;

export const BEDROOM_OPTIONS = [
  "Studio",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6 or more",
] as const;

export const PROPERTY_STATUSES = [
  "Currently empty",
  "Occupied by tenants",
  "Owner occupied",
  "Under renovation",
  "Becoming available soon",
  "Other",
] as const;

export const INITIAL_PROPOSAL_VALUES: ProposalValues = {
  postcode: "",
  propertyType: "",
  bedrooms: "",
  propertyStatus: "",
  message: "",
  fullName: "",
  email: "",
  telephone: "",
  contactMethod: "",
  consent: false,
};

const UK_POSTCODE_PATTERN =
  /^(GIR\s?0AA|(?:[A-PR-UWYZ][0-9]{1,2}|[A-PR-UWYZ][A-HK-Y][0-9]{1,2}|[A-PR-UWYZ][0-9][A-HJKSTUW]|[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEPHONE_CHARACTERS_PATTERN = /^[+\d\s().-]+$/;

export function getProposalStep(step: ProposalStep) {
  return PROPOSAL_STEPS[step - 1];
}

export function normalisePostcode(value: string) {
  const compact = value.trim().toUpperCase().replace(/\s+/g, "");

  if (compact.length <= 3) {
    return compact;
  }

  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}

export function normaliseProposalStep(
  values: ProposalValues,
  step: ProposalStep,
): ProposalValues {
  if (step === 1) {
    return {
      ...values,
      postcode: normalisePostcode(values.postcode),
      propertyType: values.propertyType.trim(),
      bedrooms: values.bedrooms.trim(),
    };
  }

  if (step === 2) {
    return {
      ...values,
      propertyStatus: values.propertyStatus.trim(),
      message: values.message.trim(),
    };
  }

  if (step === 3) {
    return {
      ...values,
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      telephone: values.telephone.trim(),
      contactMethod: values.contactMethod.trim(),
    };
  }

  return values;
}

export function validateProposalStep(
  values: ProposalValues,
  step: ProposalStep,
): ProposalFieldErrors {
  const errors: ProposalFieldErrors = {};

  if (step === 1) {
    if (!values.postcode) {
      errors.postcode = "Enter the property's postcode.";
    } else if (!UK_POSTCODE_PATTERN.test(values.postcode)) {
      errors.postcode = "Enter a valid UK postcode.";
    }

    if (!values.propertyType) {
      errors.propertyType = "Select a property type.";
    }

    if (!values.bedrooms) {
      errors.bedrooms = "Select the number of bedrooms.";
    }
  }

  if (step === 2 && !values.propertyStatus) {
    errors.propertyStatus = "Select the property's current status.";
  }

  if (step === 3) {
    if (!values.fullName) {
      errors.fullName = "Enter your full name.";
    }

    if (!values.email) {
      errors.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(values.email)) {
      errors.email = "Enter an email address in the correct format.";
    }

    const telephoneDigits = values.telephone.replace(/\D/g, "");

    if (!values.telephone) {
      errors.telephone = "Enter your telephone number.";
    } else if (
      !TELEPHONE_CHARACTERS_PATTERN.test(values.telephone) ||
      telephoneDigits.length < 9 ||
      telephoneDigits.length > 13
    ) {
      errors.telephone = "Enter a valid UK telephone number.";
    }

    if (!values.contactMethod) {
      errors.contactMethod = "Choose how you would prefer to be contacted.";
    }
  }

  if (step === 4 && !values.consent) {
    errors.consent =
      "Confirm that Rent Wise may contact you about this enquiry.";
  }

  return errors;
}

export function createProposalPayload(values: ProposalValues) {
  return {
    postcode: values.postcode,
    propertyType: values.propertyType,
    bedrooms: values.bedrooms,
    propertyStatus: values.propertyStatus,
    message: values.message,
    fullName: values.fullName,
    email: values.email,
    telephone: values.telephone,
    contactMethod: values.contactMethod,
    consent: values.consent ? "on" : "",
  };
}

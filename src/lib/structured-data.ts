const LOCAL_BUSINESS_DETAILS = {
  legalName: "Rent Wise Lettings & Management",
  address: null as string | null,
  telephone: null as string | null,
  email: null as string | null,
  companyNumber: null as string | null,
  serviceArea: ["Reading", "Berkshire"],
};

export function getLocalBusinessStructuredData() {
  const { address, companyNumber, email, legalName, serviceArea, telephone } =
    LOCAL_BUSINESS_DETAILS;

  if (!address || !telephone || !email || !companyNumber) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Rent Wise",
    legalName,
    address,
    telephone,
    email,
    identifier: companyNumber,
    areaServed: serviceArea,
  };
}

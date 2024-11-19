export interface SheetDataObject {
  Day: string;
  Age: string;
  Gender: string;
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
  [key: string]: string;
}

export interface GlobalContextType {
  formattedDataObject: {
    formattedData: SheetDataObject[];
    setFormattedData: React.Dispatch<React.SetStateAction<SheetDataObject[]>>;
  };
  selectedBarValueObject: {
    selectedBarValue: string | null;
    setSelectedBarValue: React.Dispatch<React.SetStateAction<string | null>>;
  };
  selectedFiltersObject: {
    selectedFilters: [];
    setSelectedFilters: React.Dispatch<React.SetStateAction<[]>>;
  };
  ageFilterObject: {
    ageFilter: string | null;
    setAgeFilter: React.Dispatch<React.SetStateAction<string | null>>;
  };
  genderFilterObject: {
    genderFilter: string | null;
    setGenderFilter: React.Dispatch<React.SetStateAction<string | null>>;
  };
  // dateObject: {
  //   startDate: Date | string;
  //   setStartDate: React.Dispatch<React.SetStateAction<Date | string>>;
  //   endDate: Date | string;
  //   setEndDate: React.Dispatch<React.SetStateAction<Date | string>>;
  // };
  dateObject: {
    startDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    endDate: Date | null;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  };
  // dateObject: {
  //   startDate: Date | undefined;
  //   setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  //   endDate: Date | undefined;
  //   setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  // };
}

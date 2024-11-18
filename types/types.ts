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
}

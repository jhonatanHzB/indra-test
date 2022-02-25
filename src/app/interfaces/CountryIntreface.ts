export interface ICountry {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Languages;
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  gini: Gini;
  fifa: string;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: CoatOfArms;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
  postalCode: PostalCode;
  capitalSingle: string;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  signs: string[];
  side: string;
}

export interface CoatOfArms {
  png: string;
  svg: string;
}

export interface Currencies {
  [key: string]: Currencie;
}

export interface Currencie {
  name: string;
  symbol: string;
}

export interface Demonyms {
  [key: string]: any;
}

export interface Gini {
  [key: string]: number;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Languages {
  [key: string]: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: NativeName;
}

export interface NativeName {
  [key: string]: Translation;
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: string;
  regex: string;
}

export interface IWiki {
  batchcomplete: string;
  warnings: Warnings;
  query: Query;
}

export interface Query {
  pages: Pages;
}

export interface Pages {
  [key: string]: Page;
}

export interface Page {
  pageid: number;
  ns: number;
  title: string;
  extract: string;
}

export interface Warnings {
  extracts: Extracts;
}

export interface Extracts {
  '*': string;
}

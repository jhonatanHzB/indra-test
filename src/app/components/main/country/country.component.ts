import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from 'src/app/services/countries.service';
import {
  ICountry,
  IWiki,
  Languages,
} from '../../../interfaces/CountryIntreface';

@Component({
  selector: 'app-countrie',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  informationCountry: Partial<ICountry> = initialState;
  moneda = '';
  divisa = '';
  resume = '';
  languages: string[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe({
      next: ({ countrie }) => {
        if (countrie) {
          this.countriesService
            .getCountryByName(countrie)
            .subscribe((country: ICountry[]) => {
              const [countryFound] = country;
              this.informationCountry = {
                name: countryFound.name,
                population: countryFound.population,
                capitalSingle: countryFound.capital[0],
                flag: countryFound.flags.png,
                region: countryFound.region,
                languages: countryFound.languages,
                maps: countryFound.maps,
                currencies: countryFound.currencies,
              } as Partial<ICountry>;
              const currencies = countryFound.currencies;
              const listKeysCurrencies = Object.keys(currencies);
              const [denomination] = listKeysCurrencies;
              const { name = '' } = currencies[denomination];
              this.moneda = name;
              this.divisa = denomination;
              console.log(country);
              this.getLanguagesCountry(this.informationCountry.languages);
              this.getResumeCountry();
            });
        }
      },
      error: () => {
        throw new Error('El parametro es invalido o no se encuentra');
      },
    });
  }

  getLanguagesCountry(languages: Languages | undefined): void {
    if (languages) {
      const keyLanguages = Object.keys(languages);
      const foundedLanguages = keyLanguages.map(
        (lenguage) => languages[lenguage]
      );
      this.languages = [...foundedLanguages];
    }
  }

  getResumeCountry(): void {
    const capital = this.informationCountry.capitalSingle || '';
    this.countriesService.getInformationCountryWiki(capital).subscribe({
      next: (article: IWiki) => {
        const {
          query: { pages },
        } = article;
        const [keyPage] = Object.keys(pages);
        const { extract } = pages[keyPage];
        this.resume = extract;
      },
      error: (e) => console.log(e),
    });
  }
}

const initialState = {
  name: {
    common: '',
    official: '',
  },
  population: 0,
  capital: [''],
  flag: '',
  region: '',
  languages: {},
  maps: {
    googleMaps: '',
    openStreetMaps: '',
  },
  currencies: {
    '': {
      name: '',
      symbol: '',
    },
  },
  capitalSingle: '',
};

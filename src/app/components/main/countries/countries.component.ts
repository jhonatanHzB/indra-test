import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICountry } from 'src/app/interfaces/CountryIntreface';
import { CountriesService } from '../../../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  inmutableCountries: ICountry[] = [];
  allCountries: ICountry[] = [];
  notFoundResults = false;
  hasParameters!: boolean;

  constructor(
    private activatedRouter: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((queryParams) => {
      if (queryParams['currency']) {
        this.hasParameters = true;
        this.countriesService
          .getCountriesByCurrency(queryParams['currency'])
          .subscribe({
            next: (countries: ICountry[]) => this.fillCountries(countries),
            error: (e) => {
              console.log(e);
            },
          });
      } else if (queryParams['lang']) {
        this.hasParameters = true;
        this.countriesService
          .getCountriesByLanguages(queryParams['lang'])
          .subscribe({
            next: (countries: ICountry[]) => this.fillCountries(countries),
            error: (e) => {
              console.log(e);
            },
          });
      } else {
        this.hasParameters = false;
        this.getAllCountries();
      }
    });
  }

  getAllCountries(): void {
    this.countriesService.getAllCountries().subscribe({
      next: (countries: ICountry[]) => this.fillCountries(countries),
      error: (e) => {
        console.log(e);
      },
    });
  }

  fillCountries(countries: ICountry[]): void {
    this.inmutableCountries = this.generateCountryDate(countries);
    this.allCountries = [...this.orderCountries(this.inmutableCountries)];
  }

  searchCountry(query: string): void {
    this.allCountries = this.inmutableCountries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    this.notFoundResults = this.allCountries.length <= 0;
  }

  generateCountryDate(countries: ICountry[]): ICountry[] {
    return countries.map(
      (country: ICountry) =>
        ({
          name: country.name,
          population: country.population,
          capital: country.capital,
          flag: country.flags.png,
          region: country.region,
        } as ICountry)
    );
  }

  orderCountries(countries: ICountry[]): ICountry[] {
    return countries.sort((a, b) =>
      a.name.common.localeCompare(b.name.common, 'es', {
        sensitivity: 'base',
      })
    );
  }

  searchByRegion(region: string): void {
    if (region !== 'all') {
      this.countriesService.getCountriesByRegion(region).subscribe({
        next: (countries: ICountry[]) => {
          let countriesInRegion = this.generateCountryDate(countries);
          this.allCountries = [...this.orderCountries(countriesInRegion)];
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      if (this.hasParameters) {
        this.getAllCountries();
      } else {
        this.allCountries = [...this.inmutableCountries];
      }
    }
  }
}

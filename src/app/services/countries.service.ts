import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
import { ICountry, IWiki } from '../interfaces/CountryIntreface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private httpClient: HttpClient) {}

  getAllCountries(): Observable<ICountry[]> {
    return this.httpClient
      .get<ICountry[]>('https://restcountries.com/v3.1/all')
      .pipe(catchError(ErrorHandlerService.handleError));
  }

  getCountriesByRegion(region: string): Observable<ICountry[]> {
    return this.httpClient
      .get<ICountry[]>(`https://restcountries.com/v3.1/region/${region}`)
      .pipe(catchError(ErrorHandlerService.handleError));
  }

  getCountryByName(name: string): Observable<ICountry[]> {
    return this.httpClient
      .get<ICountry[]>(`https://restcountries.com/v3.1/name/${name}`)
      .pipe(catchError(ErrorHandlerService.handleError));
  }

  getCountriesByCurrency(currency: string): Observable<ICountry[]> {
    return this.httpClient
      .get<ICountry[]>(`https://restcountries.com/v3.1/currency/${currency}`)
      .pipe(catchError(ErrorHandlerService.handleError));
  }

  getCountriesByLanguages(lang: string): Observable<ICountry[]> {
    return this.httpClient
      .get<ICountry[]>(`https://restcountries.com/v3.1/lang/${lang}`)
      .pipe(catchError(ErrorHandlerService.handleError));
  }

  getInformationCountryWiki(country: string): Observable<IWiki> {
    return this.httpClient
      .get<IWiki>(
        `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&redirects=1&titles=${country}`
      )
      .pipe(catchError(ErrorHandlerService.handleError));
  }
}

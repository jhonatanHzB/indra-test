import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './components/main/country/country.component';
import { CountriesComponent } from './components/main/countries/countries.component';
import { HomeComponent } from './components/main/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/:countrie', component: CountryComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, Input, OnInit } from '@angular/core';
import { ICountry } from 'src/app/interfaces/CountryIntreface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() country!: ICountry;
  capital!: string;

  constructor() {}

  ngOnInit(): void {
    const [principal] = this.country.capital ?? '';
    this.capital = principal;
  }
}

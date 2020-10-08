import { Category } from '../shared/models/category.enum';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  name: string;
  description: string;
  price: number;
  categories: Category[];
  isAvailable: boolean;

  constructor() { }

  ngOnInit(): void {
    this.name = 'First name';
    this.description = 'First description';
    this.price = 10.00;
    this.categories = [ Category.Sport, Category.Food ];
    this.isAvailable = true;
  }

}

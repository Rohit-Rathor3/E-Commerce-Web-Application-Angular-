import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { product } from '../data-types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchProduct:undefined|product[];
  constructor(private activateRoute:ActivatedRoute, private product :ProductService ){}
  ngOnInit(): void {
    let query = this.activateRoute.snapshot.paramMap.get('query');
    query && this.product.searchProduct(query).subscribe((result)=>{
     this.searchProduct=result;
  })
}

}

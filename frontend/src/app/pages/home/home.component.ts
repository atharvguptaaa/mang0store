import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from "../../products/product-list/product-list.component";

@Component({
  selector: 'app-home',
  imports: [RouterModule, ProductListComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

import { Component, OnDestroy,OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.components';
import { ShoppingService } from '../services/shopping.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent  implements OnInit{
  ingredients: Ingredient[] = []
  private igChangeSub: Subscription
  constructor(private shoppingService: ShoppingService){}
  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.igChangeSub = this.shoppingService.newIngredientAdded.subscribe((newIngredients: Ingredient[]) => {
      this.ingredients = newIngredients;
    })
  }
  ngOnDestroy(): void{
    this.igChangeSub.unsubscribe();
  }
  onEditItem(i){
    this.shoppingService.startedEditting.next(i);
  }
}

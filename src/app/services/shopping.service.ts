import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.components';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  startedEditting = new Subject<number> ();

  newIngredientAdded = new Subject<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Mango', 10),
    new Ingredient('Tomato',15)
  ]
  constructor() { }

  getIngredients() {
    return this.ingredients.slice()
  }

  getIngredientWithIndex(index: number){
    return this.ingredients[index];
  }

  addIngredient(newIngredient: Ingredient) {
    this.ingredients.push(newIngredient);
    this.newIngredientAdded.next(this.ingredients.slice());
  }

  addMultipleIngredients(mulIngredients: Ingredient[]){
    this.ingredients.push(...mulIngredients)
    this.newIngredientAdded.next(this.ingredients.slice());
  }

  updateIngredient(index: number, updatedIngredient: Ingredient){
    this.ingredients[index] = updatedIngredient;
    this.newIngredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.newIngredientAdded.next(this.ingredients.slice());
  }
  
}

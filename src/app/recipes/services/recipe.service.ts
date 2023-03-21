import { Injectable } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.components';
import { Recipe } from '../recipes.model';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>()
  recipes: Recipe[]=[];
  constructor(private shoppingService: ShoppingService) { }

  setRecipe(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }


  addIngredientToShopping(ingredients: Ingredient[]) {
    this.shoppingService.addMultipleIngredients(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice())
  }
}

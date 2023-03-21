import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/services/recipe.service';
import { Recipe } from '../recipes/recipes.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'Your_FireBase_Data_Base_Link/recipes.json',
      recipes
    ).subscribe((res) => {})
  }

  fetchRecipe() {
    return this.http.get<Recipe[]>(
      'Your_FireBase_Data_Base_Link/recipes.json'
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        })
      }),
      tap((recipes) => {
        this.recipeService.setRecipe(recipes);

      })
    )
  }
}

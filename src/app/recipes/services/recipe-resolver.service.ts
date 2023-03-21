import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Ingredient } from 'src/app/shared/ingredients.components';
import { Recipe } from '../recipes.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const recipes = this.recipeService.getRecipes();
    if(recipes.length === 0){
    return this.dataStorageService.fetchRecipe()}
    else
    {
      return recipes;
    }
  }

}

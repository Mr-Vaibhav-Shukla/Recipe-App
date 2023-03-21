import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.components';
import { ShoppingService } from 'src/app/services/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor(private shoppingServices: ShoppingService) { };
  @ViewChild('f') slform: NgForm;

  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ngOnInit(): void {
    this.subscription = this.shoppingServices.startedEditting.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingServices.getIngredientWithIndex(index);
        this.slform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingServices.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else {
      this.shoppingServices.addIngredient(newIngredient)
    }
    form.reset();
    this.editMode = false;
  }

  onDeleteItem() {
    if (this.editMode) {
      this.shoppingServices.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
  }

  onClear() {
    this.slform.reset();
    this.editMode = false;
  }
}

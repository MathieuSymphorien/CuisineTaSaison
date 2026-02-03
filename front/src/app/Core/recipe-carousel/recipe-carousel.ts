import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  input,
} from "@angular/core";
import { RecipeModel } from "src/app/Models/recipe.model";
import { Recipe } from "../recipe/recipe";

@Component({
  selector: "app-recipe-carousel",
  standalone: true,
  imports: [Recipe],
  templateUrl: "./recipe-carousel.html",
  styleUrls: ["./recipe-carousel.css"],
})
export class RecipeCarousel implements AfterViewInit {
  recipes = input<RecipeModel[]>();

  @ViewChild("carouselRef") carousel!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    // Défilement automatique
    setInterval(() => this.scrollRight(), 5000);
  }

  scrollRight() {
    const el = this.carousel.nativeElement;
    if (el.scrollLeft + el.offsetWidth >= el.scrollWidth - 5) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      el.scrollBy({ left: 300, behavior: "smooth" });
    }
  }

  scrollLeft() {
    const el = this.carousel.nativeElement;
    if (el.scrollLeft <= 0) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    } else {
      el.scrollBy({ left: -300, behavior: "smooth" });
    }
  }
}

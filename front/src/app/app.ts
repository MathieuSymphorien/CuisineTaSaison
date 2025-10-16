import { Component } from "@angular/core";
import { Home } from "./home/home";
import { Recipe } from "./recipe/recipe";

@Component({
  selector: "app-root",
  imports: [Home, Recipe],
  template: `
    <main>
      <header class="brand-name">
        <img
          class="brand-logo"
          src="/assets/logo.svg"
          alt="logo"
          aria-hidden="true"
        />
      </header>
      <section class="content">
        <app-home></app-home>
        <app-recipe></app-recipe>
      </section>
    </main>
  `,
  styleUrls: ["./app.css"],
})
export class App {
  title = "homes";
}

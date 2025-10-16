import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="brand-name">
      <nav>
        <a routerLink="/">
          <img src="/assets/logo.svg" alt="logo" aria-hidden="true" />
        </a>
        <a routerLink="/proposition">Proposition</a>
        <a routerLink="/recette">Recette</a>
        <a routerLink="/aliment">Aliment</a>
        <a routerLink="/connexion">Connexion</a>
      </nav>
    </header>
    <router-outlet />
  `,
  styles: ``,
})
export class Header {}

import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="brand-name">
      <nav>
        <a routerLink="/">
          <img
            class="brand-logo"
            src="/assets/logo.svg"
            alt="logo"
            aria-hidden="true"
          />
        </a>
        <a routerLink="/">Accueil</a>
        <a routerLink="/recipe">Recette</a>
      </nav>
    </header>
    <router-outlet />
    <p>header</p>
  `,
  styles: ``,
})
export class Header {}

import { Component } from "@angular/core";
import { Header } from "../../Utils/header/header";

@Component({
  selector: "app-proposal-page",
  imports: [Header],
  template: `
    <app-header></app-header>
    <p>proposal-page works!</p>
  `,
  styles: ``,
})
export class ProposalPage {}

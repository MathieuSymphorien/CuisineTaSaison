import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [RouterLink, RouterOutlet],
  templateUrl: "./header.html",
  styleUrls: ["./header.css"],
})
export class Header {}

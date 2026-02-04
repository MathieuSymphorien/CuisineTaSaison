import { Component } from "@angular/core";

@Component({
  selector: "app-footer",
  standalone: true,
  templateUrl: "./footer.html",
  styleUrls: ["./footer.css"],
})
export class Footer {
  readonly email = "mathieusdev@gmail.com";
  readonly githubUrl = "https://github.com/MathieuSymphorien/CuisineTaSaison.git";
  readonly currentYear = new Date().getFullYear();
}

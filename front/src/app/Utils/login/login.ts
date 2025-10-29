import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  imports: [FormsModule],
  templateUrl: "./login.html",
  styleUrls: ["./login.css"],
})
export class Login {
  password: string = "";
  login() {
    console.log("Login attempt with password:", this.password);
  }
}

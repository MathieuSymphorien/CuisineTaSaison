import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterModule],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ["./app.css"],
})
export class App {
  currentMonth = new Date().getMonth() + 1;
  currentDay = new Date().getDate();
  season =
    (this.currentMonth == 3 && this.currentDay >= 20) ||
    (this.currentMonth == 6 && this.currentMonth < 21) ||
    this.currentMonth == 4 ||
    this.currentMonth == 5
      ? "Printemps"
      : (this.currentMonth == 6 && this.currentDay >= 21) ||
          (this.currentMonth == 9 && this.currentDay < 22) ||
          this.currentMonth == 7 ||
          this.currentMonth == 8
        ? "Été"
        : (this.currentMonth == 9 && this.currentDay >= 23) ||
            (this.currentMonth == 12 && this.currentDay < 21) ||
            this.currentMonth == 10 ||
            this.currentMonth == 11
          ? "Automne"
          : "Hiver";

  emoji = this.setEmoji();

  constructor() {
    document.body.setAttribute("data-season", this.season);
    document.body.setAttribute("emoji-season", this.emoji);
  }

  setEmoji(): string {
    switch (this.season) {
      case "Printemps":
        if (Math.random() < 0.2) {
          return "🌸";
        } else if (Math.random() < 0.4) {
          return "🐣";
        } else if (Math.random() < 0.6) {
          return "🌷";
        } else if (Math.random() < 0.8) {
          return "🐝";
        } else {
          return "🍓";
        }
      case "Été":
        if (Math.random() < 0.2) {
          return "☀️";
        } else if (Math.random() < 0.4) {
          return "🍉";
        } else if (Math.random() < 0.6) {
          return "🍦";
        } else if (Math.random() < 0.8) {
          return "🏖️";
        } else {
          return "🌻";
        }
      case "Automne":
        if (Math.random() < 0.1) {
          return "🍁";
        } else if (Math.random() < 0.2) {
          return "🎃";
        } else if (Math.random() < 0.3) {
          return "🍂";
        } else if (Math.random() < 0.4) {
          return "🌰";
        } else {
          return "🍎";
        }
      case "Hiver":
        if (Math.random() < 0.1) {
          return "❄️";
        } else if (Math.random() < 0.2) {
          return "⛄";
        } else if (Math.random() < 0.3) {
          return "🎄";
        } else if (Math.random() < 0.4) {
          return "🍫";
        } else {
          return "🧣";
        }
      default:
        return "🍅";
    }
  }
}

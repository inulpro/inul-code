import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <header>
        <h1>Welcome to InulCode Angular!</h1>
      </header>

      <main>
        <div class="card">
          <button (click)="increment()">Count: {{ count }}</button>
          <p>Edit <code>src/app/app.component.ts</code> to get started.</p>
        </div>

        <p>
          Learn more about
          <a href="https://angular.io/" target="_blank">Angular</a>
        </p>
      </main>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }

      .card {
        padding: 2em;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1976d2;
        color: white;
        cursor: pointer;
        transition: background-color 0.25s;
      }

      button:hover {
        background-color: #1565c0;
      }

      a {
        color: #1976d2;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class AppComponent {
  title = "angular-starter";
  count = 0;

  increment() {
    this.count++;
  }
}

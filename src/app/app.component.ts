import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {injectMutation, injectQuery} from "@tanstack/angular-query-experimental";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `

    @if (query.data(); as query) {
      {{ query }}
    }

    <button (click)="mutation.mutate()">Mutate</button>
  `,
})
export class AppComponent {
  isEnabled = signal(false);

  query = injectQuery(() => ({
    queryKey: ['user'],
    queryFn: () => Promise.resolve('Hello there'),
    enabled: this.isEnabled(),
  }))

  mutation = injectMutation(() => ({
    mutationFn: () => Promise.resolve(),
    onSuccess: () => this.isEnabled.set(true),
  }))
}

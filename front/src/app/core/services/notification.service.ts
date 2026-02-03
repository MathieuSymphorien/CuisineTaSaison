import { Injectable, signal } from "@angular/core";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: number;
  message: string;
  type: NotificationType;
}

@Injectable({ providedIn: "root" })
export class NotificationService {
  private nextId = 0;
  private readonly defaultDuration = 5000;

  readonly notifications = signal<Notification[]>([]);

  success(message: string, duration = this.defaultDuration): void {
    this.show(message, "success", duration);
  }

  error(message: string, duration = this.defaultDuration): void {
    this.show(message, "error", duration);
  }

  info(message: string, duration = this.defaultDuration): void {
    this.show(message, "info", duration);
  }

  warning(message: string, duration = this.defaultDuration): void {
    this.show(message, "warning", duration);
  }

  private show(message: string, type: NotificationType, duration: number): void {
    const id = this.nextId++;
    const notification: Notification = { id, message, type };

    this.notifications.update((notifications) => [...notifications, notification]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  dismiss(id: number): void {
    this.notifications.update((notifications) =>
      notifications.filter((n) => n.id !== id)
    );
  }

  clear(): void {
    this.notifications.set([]);
  }
}

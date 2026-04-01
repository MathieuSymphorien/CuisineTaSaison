import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  noindex?: boolean;
}

const SITE_NAME = "CuisineTaSaison";
export const BASE_URL = "https://cuisinetasaison.fr";

@Injectable({ providedIn: "root" })
export class SeoService {
  constructor(
    private titleService: Title,
    private meta: Meta,
  ) {}

  update(config: SeoConfig): void {
    const fullTitle = `${config.title} | ${SITE_NAME}`;
    const url = config.url ? `${BASE_URL}${config.url}` : BASE_URL;

    this.titleService.setTitle(fullTitle);

    this.meta.updateTag({ name: "description", content: config.description });
    this.meta.updateTag({
      name: "robots",
      content: config.noindex ? "noindex, nofollow" : "index, follow",
    });
    this.meta.updateTag({ property: "og:title", content: fullTitle });
    this.meta.updateTag({
      property: "og:description",
      content: config.description,
    });
    this.meta.updateTag({ property: "og:url", content: url });
  }
}

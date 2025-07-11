import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { ApplicationConfig } from "@angular/core";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes)
    ]
}
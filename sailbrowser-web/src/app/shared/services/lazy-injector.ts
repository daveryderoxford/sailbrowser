import { Injectable, Injector, ProviderToken } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LazyInject {
   constructor(private injector: Injector) { }

   async get<T>(providerLoader: () => Promise<ProviderToken<T>>): Promise<T> {
      return this.injector.get(await providerLoader());
   }

   /**
    * Simplifies getting a provider from a dynamically imported module.
    * This is more type-safe than the basic `get` as it can infer the return
    * type and validate the provider name at compile time.
    * @param moduleLoader A function that returns a promise to a module, e.g., `() => import('@angular/material/dialog')`.
    * @param providerName The string name of the exported provider class/token from the module, e.g., `'MatDialog'`.
    */
   async getProvider<M, K extends keyof M>(
      moduleLoader: () => Promise<M>,
      providerName: K
   ): Promise<M[K] extends ProviderToken<infer I> ? I : never> {
      const module = await moduleLoader();
      const providerToken = module[providerName] as ProviderToken<any>;
      return this.injector.get(providerToken);
   }
}
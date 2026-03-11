import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
   providedIn: 'root'
})
export class AppBreakpoints {

   private breakpoint = toSignal(inject(BreakpointObserver).observe([Breakpoints.Handset]));

   readonly isMobile = computed(() => this.breakpoint()?.matches);
}
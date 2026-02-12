import { Component, computed, ElementRef, forwardRef, inject, input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { addSeconds, differenceInSeconds, format, isValid, parse } from 'date-fns';
import { FormFieldBase } from './form-field.base';

@Component({
  selector: 'app-race-time-input',
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RaceTimeInput),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RaceTimeInput),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: forwardRef(() => RaceTimeInput)
    }
  ],
  template: `
    <input
      matInput
      type="time"
      step="1"
      [formControl]="inputControl"
      (blur)="onBlur()"
      (focus)="onFocus()"
      [placeholder]="inputPlaceholder()">
  `,
  styles: [`
    :host:not(.floating) input[type='time'] {
      color: transparent;
    }
  `],
  host: {
    '[class.floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})
export class RaceTimeInput extends FormFieldBase<Date> implements Validator, OnInit {
  // --- Component-specific properties ---
  mode = input.required<'tod' | 'elapsed'>();
  baseTime = input<Date>(); // Reference time: Race Date (TOD) or Start Time (Elapsed)

  inputPlaceholder = computed(() => this.mode() === 'elapsed' ? 'mm:ss' : 'hh:mm:ss');
  inputControl = new FormControl<string>('', { nonNullable: true });

  // --- Overrides for FormFieldBase ---
  override controlType = 'app-race-time-input';

  override get empty(): boolean {
    return !this.inputControl.value;
  }

  // --- Lifecycle & ControlValueAccessor ---
  constructor() {
    super(inject(ElementRef));

    this.inputControl.valueChanges.subscribe(val => {
      this.processInput(val);
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override set disabled(value: boolean) {
    super.disabled = value;
    this.disabled ? this.inputControl.disable() : this.inputControl.enable();
  }

  override writeValue(value: Date | null): void {
    super.writeValue(value); // Let base class store the value
    if (!value) {
      this.inputControl.setValue('', { emitEvent: false });
      return;
    }
    if (this.mode() === 'tod') {
      this.inputControl.setValue(format(value, 'HH:mm:ss'), { emitEvent: false });
    } else {
      const start = this.baseTime();
      if (start) {
        const diff = differenceInSeconds(value, start);
        this.inputControl.setValue(this.formatDuration(diff), { emitEvent: false });
      }
    }
  }

  // --- Validator implementation ---
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value as Date | null;
    const base = this.baseTime();
    if (!value || !base) return null;

    if (value <= base) {
      return this.mode() === 'tod'
        ? { timeGreaterThan: { baseTime: base, actualTime: value } }
        : { positiveDuration: true };
    }
    return null;
  }

  // --- Private helpers ---
  private processInput(val: string) {
    let newDate: Date | null = null;
    if (val) {
      if (this.mode() === 'tod') {
        const base = this.baseTime() || new Date();
        let date = parse(val, 'HH:mm:ss', base);
        if (!isValid(date)) date = parse(val, 'HH:mm', base);
        if (isValid(date)) newDate = date;
      } else {
        const seconds = this.parseDuration(val);
        const start = this.baseTime();
        if (start && seconds !== null) {
          newDate = addSeconds(start, seconds);
        }
      }
    }
    // Update the value in the base class and notify forms API
    this.value = newDate;
    this._onChange(this.value);
  }

  private formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  }

  private parseDuration(str: string): number | null {
    const parts = str.split(':').map(Number);
    if (parts.some(isNaN)) return null;
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 1) return parts[0];
    return null;
  }
}

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

/**
 * Abstract base class for creating custom Angular Material form field controls.
 * This class provides the boilerplate for the MatFormFieldControl and ControlValueAccessor interfaces.
 *
 * @template T The type of the control's value.
 */
@Directive()
export abstract class FormFieldBase<T> implements MatFormFieldControl<T>, ControlValueAccessor, OnDestroy, OnInit {
  
  // --- Boilerplate for MatFormFieldControl ---
  static nextId = 0;
  readonly id = `app-custom-form-field-${FormFieldBase.nextId++}`;
  readonly stateChanges = new Subject<void>();
  
  // Abstract property that must be implemented by the subclass.
  abstract controlType: string;
  
  // Injected NgControl. Public for subclass access.
  public ngControl: NgControl | null = null;
  private _injector = inject(Injector);

  focused = false;

  private _placeholder = '';
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  private _required = false;
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  private _disabled = false;
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  protected _value: T | null = null;
  get value(): T | null { return this._value; }
  set value(value: T | null) {
    this._value = value;
    this.stateChanges.next();
  }

  get empty(): boolean {
    if (this.value === null || this.value === undefined) return true;
    if (typeof this.value === 'string') return this.value === '';
    if (Array.isArray(this.value)) return this.value.length === 0;
    return false;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }
  
  get errorState(): boolean {
    return !!this.ngControl?.invalid && !!this.ngControl?.touched;
  }
  
  // --- Boilerplate for ControlValueAccessor ---
  _onChange: (value: T | null) => void = () => {};
  _onTouched: () => void = () => {};

  constructor(protected _elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    // Inject NgControl manually to break circular dependency
    this.ngControl = this._injector.get(NgControl, null, { self: true });
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  setDescribedByIds(ids: string[]): void {
    const control = this._elementRef.nativeElement.querySelector('input, select, textarea');
    if (control) {
      control.setAttribute('aria-describedby', ids.join(' '));
    }
  }

  onContainerClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // If the click is on the input itself, let it handle the focus.
    if (target.tagName.toLowerCase() !== 'input') {
      const input = this._elementRef.nativeElement.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  }
  
  onFocus() {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }
  
  onBlur() {
    if (this.focused) {
      this.focused = false;
      this._onTouched();
      this.stateChanges.next();
    }
  }

  writeValue(obj: T | null): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

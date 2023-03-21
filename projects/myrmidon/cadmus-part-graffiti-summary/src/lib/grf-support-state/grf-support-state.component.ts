import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GrfSupportState } from '../grf-summary-part';

/**
 * Editor for GrfSupportState.
 */
@Component({
  selector: 'cadmus-grf-support-state',
  templateUrl: './grf-support-state.component.html',
  styleUrls: ['./grf-support-state.component.css'],
})
export class GrfSupportStateComponent {
  private _state?: GrfSupportState;

  type: FormControl<string>;
  date: FormControl<string>;
  reporter: FormControl<string>;
  note: FormControl<string | null>;
  form: FormGroup;

  @Input()
  public get state(): GrfSupportState | null | undefined {
    return this._state;
  }
  public set state(value: GrfSupportState | null | undefined) {
    if (this._state === value) {
      return;
    }
    this._state = value || undefined;
    this.updateForm(this._state);
  }

  @Output()
  public editorClose: EventEmitter<any>;

  @Output()
  public stateChange: EventEmitter<GrfSupportState>;

  constructor(formBuilder: FormBuilder) {
    this.type = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.date = formBuilder.control(new Date().toUTCString(), {
      validators: Validators.required,
      nonNullable: true,
    });
    this.reporter = formBuilder.control('', {
      validators: [Validators.required, Validators.maxLength(100)],
      nonNullable: true,
    });
    this.note = formBuilder.control(null, Validators.maxLength(5000));
    this.form = formBuilder.group({
      type: this.type,
      date: this.date,
      reporter: this.reporter,
      note: this.note,
    });
    // events
    this.editorClose = new EventEmitter<any>();
    this.stateChange = new EventEmitter<GrfSupportState>();
  }

  private updateForm(value?: GrfSupportState): void {
    if (!value) {
      this.form.reset();
      return;
    }
    this.type.setValue(value.type);
    this.date.setValue(value.date.toUTCString());
    this.reporter.setValue(value.reporter);
    this.note.setValue(value.note || null);
    this.form.markAsPristine();
  }

  private getState(): GrfSupportState {
    return {
      type: this.type.value,
      date: new Date(Date.parse(this.date.value)),
      reporter: this.reporter.value?.trim(),
      note: this.note.value?.trim()
    };
  }

  public cancel(): void {
    this.editorClose.emit();
  }

  public save(): void {
    this._state = this.getState();
    this.stateChange.emit(this._state);
  }
}

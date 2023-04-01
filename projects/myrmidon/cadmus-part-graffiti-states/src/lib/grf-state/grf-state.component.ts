import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';

import { GrfState } from '../grf-states-part';

@Component({
  selector: 'cadmus-grf-state',
  templateUrl: './grf-state.component.html',
  styleUrls: ['./grf-state.component.css'],
})
export class GrfStateComponent {
  private _state?: GrfState;

  type: FormControl<string>;
  date: FormControl<string>;
  reporter: FormControl<string>;
  note: FormControl<string | null>;
  form: FormGroup;

  @Input()
  public get state(): GrfState | null | undefined {
    return this._state;
  }
  public set state(value: GrfState | null | undefined) {
    if (this._state === value) {
      return;
    }
    this._state = value || undefined;
    this.updateForm(this._state);
  }

  // grf-states
  @Input()
  public stateEntries?: ThesaurusEntry[];

  @Output()
  public editorClose: EventEmitter<any>;

  @Output()
  public stateChange: EventEmitter<GrfState>;

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
    this.stateChange = new EventEmitter<GrfState>();
  }

  private updateForm(value?: GrfState): void {
    if (!value) {
      this.form.reset();
      return;
    }
    this.type.setValue(value.type);
    this.date.setValue(value.date);
    this.reporter.setValue(value.reporter);
    this.note.setValue(value.note || null);
    this.form.markAsPristine();
  }

  private getState(): GrfState {
    return {
      type: this.type.value,
      date: this.date.value,
      reporter: this.reporter.value?.trim(),
      note: this.note.value?.trim(),
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

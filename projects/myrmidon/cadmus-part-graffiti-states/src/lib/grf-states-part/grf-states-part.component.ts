import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';

import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { DialogService } from '@myrmidon/ng-mat-tools';

import {
  GRF_STATES_PART_TYPEID,
  GrfState,
  GrfStatesPart,
} from '../grf-states-part';
import { take } from 'rxjs';
import { NgToolsValidators } from '@myrmidon/ng-tools';

/**
 * Graffiti states part editor component.
 * Thesauri: grf-states.
 */
@Component({
  selector: 'cadmus-grf-states-part',
  templateUrl: './grf-states-part.component.html',
  styleUrls: ['./grf-states-part.component.css'],
})
export class GrfStatesPartComponent
  extends ModelEditorComponentBase<GrfStatesPart>
  implements OnInit
{
  public editedStateIndex: number;
  public editedState?: GrfState;

  public states: FormControl<GrfState[]>;

  // grf-states
  public stateEntries?: ThesaurusEntry[];

  constructor(
    authService: AuthJwtService,
    formBuilder: FormBuilder,
    private _dialog: DialogService
  ) {
    super(authService, formBuilder);
    this.editedStateIndex = -1;
    // form
    this.states = formBuilder.control([], {
      validators: NgToolsValidators.strictMinLengthValidator(1),
      nonNullable: true,
    });
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      states: this.states,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    const key = 'grf-states';
    if (this.hasThesaurus(key)) {
      this.stateEntries = thesauri[key].entries;
    } else {
      this.stateEntries = undefined;
    }
  }

  private updateForm(part?: GrfStatesPart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.states.setValue(part.states || []);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<GrfStatesPart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): GrfStatesPart {
    let part = this.getEditedPart(GRF_STATES_PART_TYPEID) as GrfStatesPart;
    part.states = this.states.value;
    return part;
  }

  public editState(state: GrfState, index = -1): void {
    this.editedState = state;
    this.editedStateIndex = index;
  }

  public closeState(): void {
    this.editedState = undefined;
    this.editedStateIndex = -1;
  }

  public addState(): void {
    this.editState({
      type: this.stateEntries?.length ? this.stateEntries[0].id : '',
      date: new Date().toUTCString(),
      reporter: '',
    });
  }

  public saveState(state: GrfState): void {
    let states: GrfState[];
    if (this.editedStateIndex === -1) {
      states = [...this.states.value, state].sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      states = [...this.states.value];
      states.splice(this.editedStateIndex, 1, state);
    }
    this.states.setValue(states);
    this.states.markAsDirty();
    this.states.updateValueAndValidity();
    this.closeState();
  }

  public deleteState(index: number): void {
    this._dialog
      .confirm(
        $localize`Confirm`,
        $localize`Delete this state?`,
        $localize`Yes`,
        $localize`No`
      )
      .pipe(take(1))
      .subscribe((yes) => {
        if (!yes) {
          return;
        }
        if (this.editedStateIndex === index) {
          this.closeState();
        }
        const states = [...this.states.value];
        states.splice(index, 1);
        this.states.setValue(states);
        this.states.markAsDirty();
        this.states.updateValueAndValidity();
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import { EditedObject, ModelEditorComponentBase } from '@myrmidon/cadmus-ui';
import { Flag, FlagsPickerAdapter } from '@myrmidon/cadmus-ui-flags-picker';
import { NgToolsValidators } from '@myrmidon/ng-tools';

import {
  GrfTechniquePart,
  GRF_TECHNIQUE_PART_TYPEID,
} from '../grf-technique-part';

function entryToFlag(entry: ThesaurusEntry): Flag {
  return {
    id: entry.id,
    label: entry.value,
  };
}

/**
 * Graffiti technique part editor component.
 * Thesauri: grf-techniques, grf-tools.
 */
@Component({
    selector: 'cadmus-grf-technique-part',
    templateUrl: './grf-technique-part.component.html',
    styleUrls: ['./grf-technique-part.component.css'],
    standalone: false
})
export class GrfTechniquePartComponent
  extends ModelEditorComponentBase<GrfTechniquePart>
  implements OnInit
{
  private readonly _flagAdapter: FlagsPickerAdapter;
  private _techEntries: ThesaurusEntry[];
  private _toolEntries: ThesaurusEntry[];

  // flags
  public techFlags$: Observable<Flag[]>;
  public toolFlags$: Observable<Flag[]>;

  public techniques: FormControl<Flag[]>;
  public tools: FormControl<Flag[]>;
  public note: FormControl<string | null>;

  // grf-techniques
  public get techEntries(): ThesaurusEntry[] | undefined {
    return this._techEntries;
  }
  public set techEntries(value: ThesaurusEntry[] | undefined) {
    if (this._techEntries === value) {
      return;
    }
    this._techEntries = value || [];
    this._flagAdapter.setSlotFlags(
      'techniques',
      this._techEntries.map(entryToFlag)
    );
  }

  // grf-tools
  public get toolEntries(): ThesaurusEntry[] | undefined {
    return this._toolEntries;
  }
  public set toolEntries(value: ThesaurusEntry[] | undefined) {
    if (this._toolEntries === value) {
      return;
    }
    this._toolEntries = value || [];
    this._flagAdapter.setSlotFlags('tools', this._toolEntries.map(entryToFlag));
  }

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // flags
    this._flagAdapter = new FlagsPickerAdapter();
    this._techEntries = [];
    this._toolEntries = [];
    this.techFlags$ = this._flagAdapter.selectFlags('techniques');
    this.toolFlags$ = this._flagAdapter.selectFlags('tools');
    // form
    this.techniques = formBuilder.control([], {
      validators: NgToolsValidators.strictMinLengthValidator(1),
      nonNullable: true,
    });
    this.tools = formBuilder.control([], {
      validators: NgToolsValidators.strictMinLengthValidator(1),
      nonNullable: true,
    });
    this.note = formBuilder.control(null, Validators.maxLength(5000));
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      techniques: this.techniques,
      tools: this.tools,
      note: this.note,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'grf-techniques';
    if (this.hasThesaurus(key)) {
      this.techEntries = thesauri[key].entries;
    } else {
      this.techEntries = undefined;
    }
    key = 'grf-tools';
    if (this.hasThesaurus(key)) {
      this.toolEntries = thesauri[key].entries;
    } else {
      this.toolEntries = undefined;
    }
  }

  private updateForm(part?: GrfTechniquePart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.techniques.setValue(
      this._flagAdapter.setSlotChecks('techniques', part.techniques)
    );
    this.tools.setValue(this._flagAdapter.setSlotChecks('tools', part.tools));
    this.note.setValue(part.note || null);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<GrfTechniquePart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): GrfTechniquePart {
    let part = this.getEditedPart(
      GRF_TECHNIQUE_PART_TYPEID
    ) as GrfTechniquePart;

    part.techniques =
      this._flagAdapter.getOptionalCheckedFlagIds('techniques') || [];
    part.tools = this._flagAdapter.getOptionalCheckedFlagIds('tools') || [];
    part.note = this.note.value?.trim();
    return part;
  }

  public onTechFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('techniques', flags, true);
    this.techniques.setValue(flags);
    this.techniques.markAsDirty();
    this.techniques.updateValueAndValidity();
  }

  public onToolFlagsChange(flags: Flag[]): void {
    this._flagAdapter.setSlotFlags('tools', flags, true);
    this.tools.setValue(flags);
    this.tools.markAsDirty();
    this.tools.updateValueAndValidity();
  }
}

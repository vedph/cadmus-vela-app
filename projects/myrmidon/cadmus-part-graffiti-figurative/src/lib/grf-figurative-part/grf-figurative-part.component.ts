import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
  UntypedFormGroup,
} from '@angular/forms';

import { AuthJwtService } from '@myrmidon/auth-jwt-login';
import { ThesauriSet, ThesaurusEntry } from '@myrmidon/cadmus-core';
import {
  EditedObject,
  ModelEditorComponentBase,
  renderLabelFromLastColon,
} from '@myrmidon/cadmus-ui';
import { NgToolsValidators } from '@myrmidon/ng-tools';

import {
  GrfFigurativePart,
  GRF_FIGURATIVE_PART_TYPEID,
} from '../grf-figurative-part';

/**
 * GrfFigurative part editor component.
 * Thesauri: grf-figurative-types.
 */
@Component({
  selector: 'cadmus-grf-figurative-part',
  templateUrl: './grf-figurative-part.component.html',
  styleUrls: ['./grf-figurative-part.component.css'],
})
export class GrfFigurativePartComponent
  extends ModelEditorComponentBase<GrfFigurativePart>
  implements OnInit
{
  // grf-figurative-types
  public typeEntries?: ThesaurusEntry[];

  // form
  public types: FormControl<ThesaurusEntry[]>;
  public description: FormControl<string | null>;

  constructor(authService: AuthJwtService, formBuilder: FormBuilder) {
    super(authService, formBuilder);
    // form
    this.types = formBuilder.control([], {
      validators: [NgToolsValidators.strictMinLengthValidator(1)],
      nonNullable: true,
    });
    this.description = formBuilder.control(null, Validators.maxLength(5000));
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(formBuilder: FormBuilder): FormGroup | UntypedFormGroup {
    return formBuilder.group({
      types: this.types,
      description: this.description,
    });
  }

  private updateThesauri(thesauri: ThesauriSet): void {
    let key = 'grf-figurative-types';
    if (this.hasThesaurus(key)) {
      this.typeEntries = thesauri[key].entries;
    } else {
      this.typeEntries = undefined;
    }
  }

  private updateForm(part?: GrfFigurativePart | null): void {
    if (!part) {
      this.form.reset();
      return;
    }
    this.types.setValue(
      part.types.map(
        (id) => this.typeEntries?.find((e) => e.id === id) || { id, value: id }
      )
    );
    this.description.setValue(part.description || null);
    this.form.markAsPristine();
  }

  protected override onDataSet(data?: EditedObject<GrfFigurativePart>): void {
    // thesauri
    if (data?.thesauri) {
      this.updateThesauri(data.thesauri);
    }

    // form
    this.updateForm(data?.value);
  }

  protected getValue(): GrfFigurativePart {
    let part = this.getEditedPart(
      GRF_FIGURATIVE_PART_TYPEID
    ) as GrfFigurativePart;

    part.types = this.types.value?.map((e) => e.id);
    part.description = this.description.value?.trim();
    return part;
  }

  public onTypeChange(entry: ThesaurusEntry): void {
    if (this.types.value.find((e) => e.id === entry.id)) {
      return;
    }
    const types = [...this.types.value, entry];
    types.sort((a, b) => a.value.localeCompare(b.value));
    this.types.setValue(types);
    this.types.markAsDirty();
    this.types.updateValueAndValidity();
  }

  public renderLabel(label: string): string {
    return renderLabelFromLastColon(label);
  }
}

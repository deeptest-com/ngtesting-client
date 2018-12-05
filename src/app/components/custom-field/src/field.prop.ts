
export class Field {
  label: string;
  code: string;
  descr: string;
  applyTo: string;
  type: string;
  rows: number;
  isRequired: boolean;
  format: string;
  isMulti: boolean;
  isGlobal: boolean;
  isBuildIn: boolean;

  displayOrder: number;
}

export class InputField extends Field {

}

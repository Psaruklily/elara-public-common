export interface IEnum {
  [key: string]: IEnumValue;
}

export interface IEnumValue {
  key: string;
  display: string;
}

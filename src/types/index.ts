export interface Action {
  type: string;
  rows?: Row[];
  scores?: Row[][];
  labels?: Labels;
  text?: string;
  style?: string;
  id?: string;
}

export interface Row {
  key: number;
  id: number;
  value: number;
}

export interface Labels {
  id: string;
  name: string;
  labels: string[];
}

export interface Alert {
  text: string;
  style: string;
  id: string;
}

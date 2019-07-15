export class Alert {
  type: AlertType = AlertType.Success;
  message: string = '';
  icon: string;
  title: string = '';
}

export enum AlertType {
  Success = 1,
  Error = 2,
  Info = 3
}

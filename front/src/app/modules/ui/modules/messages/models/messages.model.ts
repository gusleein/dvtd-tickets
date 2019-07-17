export class Alert {
  type: AlertType = AlertType.Success;
  message: string = '';
  icon: string;
  title: string = '';
  index: number = 0;

  constructor(a?: Alert) {
    if (a) {
      this.type = a.type;
      this.message = a.message;
      this.icon = a.icon;
      this.title = a.title;
      this.index = a.index;
    }
  }
}

export enum AlertType {
  Success = 1,
  Error = 2,
  Info = 3
}

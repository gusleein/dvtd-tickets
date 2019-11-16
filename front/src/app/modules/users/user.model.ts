import * as helpers from "@core/shared/helpers";
import {Ticket} from "@modules/users/users.service";


export class UserView {
  public phone: string = '';
  public name: string = '';
  public cardNumber: string = '';
  public tickets: Ticket[] = [];

  public id?: string;

  constructor(u?: UserView) {
    if (u) {
      this.phone = u.phone;
      this.name = u.name;
      this.cardNumber = u.cardNumber;
      this.tickets = u.tickets;
      this.id = u.id;
    }
  }

  getTicketByEvent(eventId: string): Ticket {
    return this.tickets.find((t: Ticket) => t.eventId == eventId)
  }

  getTicketDate(eventId: string): string {
    let t = this.getTicketByEvent(eventId);
    return helpers.tsToStringDate(t.soldAt * 1000)
  }

  getTicketPrice(eventId: string): number {
    let t = this.getTicketByEvent(eventId);
    return t.price;
  }
}
/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 07/05/2019.
 */
import {AuthUser} from "@modules/auth/shared/types";

export class User implements AuthUser {

  public phone: string = '';
  public token: string = '';
  public id?: number | string = 0;

  constructor(u?: AuthUser) {
    if (u) {
      this.phone = u.phone;
      this.token = u.token;
      this.id = u.id;
    }
  }
}
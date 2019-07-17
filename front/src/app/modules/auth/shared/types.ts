/**
 * Created by @gusleein (Andrey Sanatullov)
 * https://github.com/gusleein
 *
 * on 11.7.2019
 */

export interface AuthSignInData {
  phone: string;
  password: string;
}

export interface AuthPhoneConfirmData {
  phone: string;
  code: string;
}

export interface AuthUser {
  id?: number | string;
  phone: string;
  token: string;
}

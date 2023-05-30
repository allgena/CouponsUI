import ICompany from "../models/ICompany";
import ICoupon from "../models/ICoupon";
import ICustomer from "../models/ICustomer";
import IPurchase from "../models/IPurchase";
import ISuccessfulLoginData from "../models/ISuccessFulLoginData";
import IUser from "../models/IUser";

export class AppState {
  public coupons: ICoupon[] = [];
  public logInData: ISuccessfulLoginData | undefined;
  public searchValue: string = "";
  public filterredCoupons: ICoupon[] = [];
  public users: IUser[] = [];
  public filterredUsers: IUser[] = [];
  public companies: ICompany[] = [];
  public customers: ICustomer[] = [];
  public purchases: IPurchase[] = [];
  public getCouponsByPage: ICoupon[] = [];
}

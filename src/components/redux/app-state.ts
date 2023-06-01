import ICompany from "../models/ICompany";
import ICoupon from "../models/ICoupon";

import ICustomer from "../models/ICustomer";
import IPurchase from "../models/IPurchase";
import ISuccessfulLoginData from "../models/ISuccessFulLoginData";
import IUser from "../models/IUser";

export class AppState {
 
  
  public coupons: ICoupon[] = [];
  public logInData: ISuccessfulLoginData ={
    id: 0, userName: "", userType: "",
    companyId: 0
  };
  public searchValue: string = "";
  public filterredCoupons: ICoupon[] = [];
  public users: IUser[] = [];
  public userForUpdate={};
  public filterredUsers: IUser[] = [];
  public userDetails: ISuccessfulLoginData = {
    id: 0, userType: "", userName: "",
    companyId: 0
  };
  public companies: ICompany[] = [];
  public customers: ICustomer[] = [];
  public purchases: IPurchase[] = [];
  public getCouponsByPage: ICoupon[] = [];
  public updateCoupon: any;
  public getPurchases:IPurchase[]=[];
  public coupon :ICoupon = {
    couponId: 0, couponName: "", category: "", companyName: "", price: 0,
    description: "", imageURL: "",
    startDate: undefined,
    endDate: undefined,
    coupon: undefined
  };
  
  public selectedCategory: string = "All";
}

import ICoupon from "../models/ICoupon";
import { Action } from "./action";
import { ActionType } from "./action-type";
import { AppState } from "./app-state";

export function reduce(
  oldAppState: AppState = new AppState(),
  action: Action
): AppState {
  const newAppState = { ...oldAppState };


  switch (action.type) {
    
    case ActionType.GetCoupons:
      newAppState.coupons = action.payload.coupons;
      break;

      case ActionType.SelectedCategory:
      newAppState.selectedCategory = action.payload.selectedCategory;
      break;

      case ActionType.GetCoupon:
        newAppState.coupon=action.payload.coupon;
        break;

    case ActionType.GetUsers:
      newAppState.users = action.payload.users;
      break;

    case ActionType.GetCustomers:
      newAppState.customers = action.payload.customers;
      break;

    case ActionType.GetCompanies:
      newAppState.companies = action.payload.companies;
      break;

    case ActionType.GetPurchases:
      newAppState.purchases = action.payload.purchases;
      break;

    case ActionType.LogInData:
      newAppState.logInData = action.payload.successfulLoginData;
      break;

     
    case ActionType.ChangeCouponProps:
      
      let couponId = action.payload.coupon.couponId;
     
      // let coupon = newAppState.coupons.find(
      //   (coupon) => coupon.couponId === couponId
      // ) as ICoupon;
      // coupon.couponName = "";
      // coupon.category = "";
      // coupon.description = ""; 
      // coupon.price = +"";
      // coupon.startDate = "";
      // coupon.endDate = "";
      // coupon.imageURL = "";

      newAppState.coupon = action.payload.coupon;
      break;

    case ActionType.SearchValue:
      newAppState.searchValue = action.payload.searchValue;
      break;

    case ActionType.DeleteCoupon:
      let id = action.payload.couponDeletedId;
      let couponsArrayAfterDeletion = newAppState.coupons.filter((coupon) => {
        return id !== coupon.couponId;
      });
      newAppState.coupons = couponsArrayAfterDeletion;
      newAppState.coupons = [...newAppState.coupons];
      break;

      // case ActionType.DeleteCompany:
      // let id = action.payload.companyDeletedId;
      // let companiesArrayAfterDeletion = newAppState.coupons.filter((company) => {
      //   return id !== company.companyId;
      // });
      // newAppState.companies = companiesArrayAfterDeletion;
      // newAppState.companies = [...newAppState.companies];
      // break;
  }

  return newAppState;
}

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
      newAppState.logInData = action.payload.logInData;
      break;

    case ActionType.ChangeCouponProps:
      let couponId = action.payload.couponId;
      let coupon = newAppState.coupons.find(
        (coupon) => coupon.id == couponId
      ) as ICoupon;
      coupon.couponName = "";
      coupon.category = "";
      coupon.description = "";
      coupon.price = +"";
      coupon.startDate = "";
      coupon.endDate = "";

      newAppState.coupons = [...newAppState.coupons];
      break;

    case ActionType.SearchValue:
      newAppState.searchValue = action.payload.searchValue;
      break;
  }

  return newAppState;
}

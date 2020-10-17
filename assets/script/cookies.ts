import { MyStore } from "@/store/store";

function getCartCookies(_store: MyStore, _rawCart: any){
    if (_store.main.cart.cookieCart.length > 0 || _store.main.account.isLogin) {
        return
      }
      const cart = !_rawCart ? [] : JSON.parse(_rawCart);
      const isLogin = _store.main.account.isLogin;
      _store.main.cart.setCart({ isLogin: isLogin, cookie: cart });
}

export {getCartCookies}
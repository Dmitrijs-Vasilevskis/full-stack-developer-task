import { PureComponent, ReactElement } from "react";
import { connect } from "react-redux";
import { AppDispatch } from "../../store";
import { toggleCartOverlay } from "../../store/Cart/Cart.reducer";
import MinicartItem from "../MinicartItem/MinicartItem";
import { placeOrderAction } from "../../store/Cart/Cart.action";
import { CartItems } from "../../store/Cart/Cart.types";

interface MinicartOverlayProps extends MapStateToProps {}

class MinicartOverlay extends PureComponent<
  MinicartOverlayProps & MapDispatchToProps
> {
  onPlaceOrder() {
    const { placeOrder } = this.props;

    placeOrder();
  }

  isPlaceOrderAllowed() {
    const { cartItems } = this.props;
    return cartItems.length > 0;
  }

  renderCartCounter(): ReactElement {
    const { cartItemsCount } = this.props;

    if (cartItemsCount > 1) {
      return <span>{cartItemsCount} Items</span>;
    } else {
      return <span>1 Item</span>;
    }
  }

  getCartTotals() {
    const { cartItems } = this.props;

    const totals = cartItems.reduce((acc, item) => {
      return acc + item.price.amount * item.qty;
    }, 0);

    return totals.toFixed(2);
  }

  renderPlaceOrder() {
    const isAllowed = this.isPlaceOrderAllowed();
    return (
      <button
        disabled={!isAllowed}
        onClick={() => this.onPlaceOrder()}
        className={`${
          isAllowed ? "bg-btn-primary" : "bg-gray-500 cursor-initial"
        } w-full mt-4 py-4 px-8 text-white uppercase text-sm font-medium`}
      >
        Place Order
      </button>
    );
  }

  render() {
    const { cartItems, cartItemsCount } = this.props;

    return (
      <aside
        data-testid="cart-overlay"
        className="absolute top-[100%] right-0 min-w-[320px] px-4 py-8 bg-white shadow-lg"
      >
        <div className="text-start mb-4">
          <strong>My Bag,</strong>
          {!!cartItemsCount && this.renderCartCounter()}
        </div>
        <div>
          <div className="flex flex-col gap-5 overflow-auto max-h-[400px]">
            {cartItems.map((product, i) => (
              <MinicartItem key={i} product={product} index={i} />
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-between mt-4">
          <strong className="text-base font-medium">Total</strong>
          <div data-testid="cart-total" className="">
            ${this.getCartTotals()}
          </div>
        </div>
        {this.renderPlaceOrder()}
      </aside>
    );
  }
}

interface MapStateToProps {
  cartItems: CartItems[];
  cartItemsCount: number;
  cartOverlasyStatus: boolean;
}

interface MapDispatchToProps {
  toggleCartOverlay: () => void;
  placeOrder: () => void;
}

const mapStateToProps = (state: any): MapStateToProps => ({
  cartItems: state.cartReducer.cartItems,
  cartItemsCount: state.cartReducer.cartItemsCount,
  cartOverlasyStatus: state.cartReducer.cartOverlayStatus,
});

const mapDispatchToProps = (dispatch: AppDispatch): MapDispatchToProps => ({
  toggleCartOverlay: () => dispatch(toggleCartOverlay()),
  placeOrder: () => dispatch(placeOrderAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MinicartOverlay);

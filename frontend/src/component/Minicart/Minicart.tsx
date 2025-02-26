import { PureComponent } from "react";
import miniCartSvg from "../../assets/mini-cart.svg";
import { AppDispatch, RootState } from "../../store";
import { connect } from "react-redux";
import { toggleCartOverlay } from "../../store/Cart/Cart.reducer";

interface MinicartProps extends ProductPageMapStateProps {}

class Minicart extends PureComponent<
  MinicartProps & ProductPageMapDispatchProps
> {
  render() {
    const { cartItemsCount, toggleCartOverlay } = this.props;
    return (
      <>
        <button
          data-testid="cart-btn"
          className="relative cursor-pointer"
          onClick={() => toggleCartOverlay()}
        >
          <img src={miniCartSvg} alt="empty-cart" />
          {cartItemsCount > 0 && (
            <span className="absolute top-[-10px] right-[-10px] h-5 w-5 rounded-full text-sm text-white  bg-black flex justify-center">
              {cartItemsCount}
            </span>
          )}
        </button>
      </>
    );
  }
}

interface ProductPageMapDispatchProps {
  toggleCartOverlay: () => void;
}

interface ProductPageMapStateProps {
  cartItemsCount: number;
}

const mapStateToProps = (state: RootState): ProductPageMapStateProps => ({
  cartItemsCount: state.cartReducer.cartItemsCount,
});

const mapDispatchToProps = (
  dispatch: AppDispatch
): ProductPageMapDispatchProps => ({
  toggleCartOverlay: () => dispatch(toggleCartOverlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);

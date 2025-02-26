import { PureComponent } from "react";
import Header from "../../component/Header/Header";
import { Outlet } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { connect } from "react-redux";
import { toggleCartOverlay } from "../../store/Cart/Cart.reducer";

interface HomePageState extends MapStateToProps, MapDispatchToProps {}

class HomePage extends PureComponent<HomePageState> {
  render() {
    const { cartOverlayStatus, toggleCartOverlay } = this.props;
    return (
      <>
        <div
          onClick={toggleCartOverlay}
          className={`fixed invisible inset-0 bg-black/50 z-10 transition-opacity duration-300 opacity-0
           ${cartOverlayStatus ? "visible opacity-100" : "opacity-0"}`}
        />
        <Header />
        <Outlet />
      </>
    );
  }
}

interface MapStateToProps {
  cartOverlayStatus: boolean;
}

interface MapDispatchToProps {
  toggleCartOverlay: () => void;
}

const mapStateToProps = (state: RootState): MapStateToProps => ({
  cartOverlayStatus: state.cartReducer.cartOverlayStatus,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleCartOverlay: () => dispatch(toggleCartOverlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

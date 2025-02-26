import { PureComponent } from "react";
import Navigation from "../Navigation/Navigation";
import Minicart from "../Minicart/Minicart";
import MinicartOverlay from "../MinicartOverlay/MinicartOverlay";
import { RootState } from "../../store";
import { connect } from "react-redux";

class Header extends PureComponent<HeaderMapStateToProps> {
  render() {
    const { cartOverlayStatus } = this.props;
    return (
      <>
        <header className="z-20 relative bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-8 relative z-10 flex items-center justify-between">
            <div className="flex-1">
              <Navigation />
            </div>
            <div className="flex-1 flex justify-center">
              <img src="/logo.png" alt="logo" className="h-10" />
            </div>
            <div className="flex-1 flex justify-end relative">
              <Minicart />
            </div>
            {cartOverlayStatus && <MinicartOverlay />}
          </div>
        </header>
      </>
    );
  }
}
interface HeaderMapStateToProps {
  cartOverlayStatus: boolean;
}

const mapStateToProps = (state: RootState): HeaderMapStateToProps => ({
  cartOverlayStatus: state.cartReducer.cartOverlayStatus,
});

export default connect(mapStateToProps, null)(Header);

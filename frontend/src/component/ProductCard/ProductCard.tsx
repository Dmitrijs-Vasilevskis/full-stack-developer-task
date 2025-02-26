import { PureComponent } from "react";
import { Link } from "react-router-dom";
import minicartSvg from "../../../public/mini-cart.svg";
import { getDefaultAttributes } from "../../util/Cart/CartHelper";
import { AppDispatch } from "../../store";
import { connect } from "react-redux";
import { updateCartAction } from "../../store/Cart/Cart.action";
import { Product } from "../../store/ProductPage/Product.type";
import { CartItems } from "../../store/Cart/Cart.types";

interface ProductCardProps {
  product: Product;
}

class ProductCard extends PureComponent<
  ProductCardProps & ProductCardMapDispatchToProps
> {
  getProductPrice() {
    const { product } = this.props;

    const priceObj = product.price[0];
    return `${priceObj.currency_symbol} ${priceObj.amount.toFixed(2)}`;
  }

  addToCart() {
    const { product, updateCart } = this.props;
    const defaultAttributes = getDefaultAttributes(product);

    const cartItem: CartItems = {
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price[0],
      thumbnail: product.gallery.images[0],
      selectedAttributes: defaultAttributes,
      attributes: product.attributes,
      qty: 1,
    };

    updateCart(cartItem);
  }

  render() {
    const { product } = this.props;
    return (
      <div
        data-testid={`product-${product.name
          .replace(/\s+/g, "-")
          .toLowerCase()}`}
        className="group/item p-4 relative hover:shadow-lg transition-shadow duration-300 ease-in-out"
      >
        <Link to={`/product/${product.sku}`} className="inline-block relative">
          <img
            className="h-[330px] object-contain w-full"
            src={product.gallery.images[0]}
            alt={product.name}
          />
          {!product.inStock && (
            <div className="absolute inset-0 w-full flex items-center justify-center bg-black opacity-25">
              <span className="text-font-secondary font-normal text-2xl uppercase">
                Out of Stock
              </span>
            </div>
          )}
        </Link>
        <div className="text-left py-3 relative">
          {product.inStock && (
            <button
              onClick={() => this.addToCart()}
              className="rounded-full invisible group-hover/item:visible bg-btn-primary cursor-pointer absolute justify-center right-3 top-[-24px] p-3"
            >
              <img src={minicartSvg} alt="" />
            </button>
          )}
          <h3 className="font-light text-lg">
            <Link to={`/product/${product.sku}`}>{product.name}</Link>
          </h3>
          <span className=" font-normal text-lg text-font-secondary">
            {this.getProductPrice()}
          </span>
        </div>
      </div>
    );
  }
}

interface ProductCardMapDispatchToProps {
  updateCart: (cartItem: CartItems) => void;
}

const mapDispatchToProps = (
  dispatch: AppDispatch
): ProductCardMapDispatchToProps => ({
  updateCart: (cartItem: CartItems) => dispatch(updateCartAction(cartItem)),
});

export default connect(null, mapDispatchToProps)(ProductCard);

import { Fragment, PureComponent, ReactElement } from "react";
import { AppDispatch, RootState } from "../../store";
import { connect } from "react-redux";
import { updateCartAction } from "../../store/Cart/Cart.action";
import { renderSafeHTML } from "../../util/htmlParser";
import {
  Product,
  ProductAttribute,
} from "../../store/ProductPage/Product.type";
import { CartItems } from "../../store/Cart/Cart.types";

interface ProductDetailsProps {
  product: Product;
  cartItems: CartItems[];
  updateCart: (cartItem: CartItems) => void;
}

interface ProductDetailsState {
  selectedAttributes: Record<string, string>;
  product: Product;
}

interface AttributeRendererMap {
  [attributeType: string]: (attribute: ProductAttribute) => ReactElement[];
}

class ProductDetails extends PureComponent<
  ProductDetailsProps & ProductDetailsMapStateProps,
  ProductDetailsState
> {
  constructor(props: ProductDetailsProps) {
    super(props);

    this.state = {
      product: props.product,
      selectedAttributes: {},
    };
  }

  attributeRendererMap: AttributeRendererMap = {
    swatch: (attribute: ProductAttribute) =>
      this.renderSwatchAttribute(attribute),
    text: (attribute: ProductAttribute) => this.renderTextAttribute(attribute),
    default: (attribute: ProductAttribute) =>
      this.renderTextAttribute(attribute),
  };

  getAttributeRenderer = (attribute: ProductAttribute) =>
    this.attributeRendererMap[attribute.type] ||
    this.attributeRendererMap.default;

  isPurchaseAllowed = () => {
    const { selectedAttributes } = this.state;
    const { product } = this.props;

    if (!product.inStock) {
      return false;
    }

    return product.attributes.every((attribute) =>
      selectedAttributes.hasOwnProperty(attribute.attribute_code)
    );
  };

  handleSelectedAttribute = (
    attribute: ProductAttribute,
    item: { value: string }
  ) => {
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        [attribute.attribute_code]: item.value,
      },
    }));
  };

  handleAddToCart = () => {
    const { selectedAttributes } = this.state;
    const { product, updateCart } = this.props;

    const cartItem: CartItems = {
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price[0],
      thumbnail: product.gallery.images[0],
      selectedAttributes: selectedAttributes,
      attributes: product.attributes,
      qty: 1,
    };

    updateCart(cartItem);
  };

  renderTextAttribute(attribute: ProductAttribute): ReactElement[] {
    return attribute.items.map((item, i) => {
      const isSelected =
        this.state.selectedAttributes[attribute.attribute_code] === item.value;
      return (
        <Fragment key={i}>
          <button
            className={`
            ${isSelected ? "text-white bg-black" : "bg-white text-black"}
            px-4 py-2  border text-sm font-medium border-gray-400 hover:opacity-75`}
            data-testid={`product-attribute-${attribute.name.toLowerCase()}=${item.value.toLowerCase()}`}
            name={attribute.name}
            value={item.value}
            disabled={isSelected}
            id={`${attribute.type}-${item.value}`}
            onClick={() => this.handleSelectedAttribute(attribute, item)}
          >
            {item.value}
          </button>
        </Fragment>
      );
    });
  }

  renderSwatchAttribute(attribute: ProductAttribute): ReactElement[] {
    return attribute.items.map((item, i) => {
      const isSelected =
        this.state.selectedAttributes[attribute.attribute_code] === item.value;
      return (
        <Fragment key={i}>
          <button
            style={{ backgroundColor: item.value }}
            data-testid={`product-attribute-${attribute.name.toLowerCase()}=${item.value.toLowerCase()}`}
            className={`h-8 w-8 border
                ${isSelected ? "scale-125" : "border-gray-400"}
                 text-sm font-medium border-gray-400 hover:bg-gray-200`}
            name={attribute.name}
            value={item.value}
            id={`${attribute.type}-${item.value}`}
            onClick={() => this.handleSelectedAttribute(attribute, item)}
          />
        </Fragment>
      );
    });
  }

  renderAttributes(product: Product): ReactElement[] {
    return product.attributes.map((attribute: ProductAttribute) => {
      return (
        <div
          data-testid={`product-attribute-${attribute.name.toLowerCase()}`}
          key={attribute.attribute_code}
          className="mt-4"
        >
          <span className="text-lg font-bold">{attribute.name}:</span>
          <div className="flex flex-row gap-2 mt-2">
            {this.getAttributeRenderer(attribute)(attribute)}
          </div>
        </div>
      );
    });
  }

  renderPrice(product: Product): ReactElement {
    return (
      <div className="flex flex-col gap-2 mt-3">
        <span className="text-gray-500">Price:</span>
        <div>
          <strong>{`${product.price[0].currency_symbol}`}</strong>
          <strong>{`${product.price[0].amount.toFixed(2)}`}</strong>
        </div>
      </div>
    );
  }

  renderDescription() {
    const { product } = this.props;

    if (!product.description) {
      return null;
    }

    return (
      <div className="mt-4" data-testid="product-description">
        {renderSafeHTML(product.description)}
      </div>
    );
  }

  renderAddToCart() {
    const isAllowed = this.isPurchaseAllowed();

    return (
      <div className="w-full mt-4">
        <button
          data-testid="add-to-cart"
          disabled={!isAllowed}
          onClick={this.handleAddToCart}
          className={`${
            isAllowed ? "bg-btn-primary" : "bg-gray-500 cursor-initial"
          } px-8 py-4 w-full text-white font-semibold text-base leading-5 tracking-normal text-center`}
        >
          Add to cart
        </button>
      </div>
    );
  }

  render() {
    const { product } = this.props;
    if (!product || !product.attributes) {
      return <p>Loading product...</p>;
    }

    return (
      <>
        <section className="text-left min-w-[350px] max-w-[35%] w-auto">
          <h1 className="text-3xl font-semibold ">{product.name}</h1>
          {this.renderAttributes(product)}
          {this.renderPrice(product)}
          {this.renderAddToCart()}
          {this.renderDescription()}
        </section>
      </>
    );
  }
}

interface ProductDetailsMapDispatchProps {
  updateCart: (cartItem: CartItems) => void;
}

interface ProductDetailsMapStateProps {
  cartItems: CartItems[];
}

const mapStateToProps = (state: RootState): ProductDetailsMapStateProps => ({
  cartItems: state.cartReducer.cartItems || [],
});

const mapDispatchToProps = (
  dispatch: AppDispatch
): ProductDetailsMapDispatchProps => ({
  updateCart: (cartItem: CartItems) => dispatch(updateCartAction(cartItem)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

import { Fragment, PureComponent, ReactElement, ReactNode } from "react";
import { updateCartItemQty } from "../../store/Cart/Cart.reducer";
import { AppDispatch } from "../../store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { CartItems } from "../../store/Cart/Cart.types";
import {
  AttributeItem,
  ProductAttribute,
} from "../../store/ProductPage/Product.type";

interface MinicartItemProps {
  product: CartItems;
  index: number;
}

type MinicartItemState = MinicartItemProps;

interface AttributeRendererMap {
  [attributeType: string]: (attribute: ProductAttribute) => ReactElement[];
}

class MinicartItem extends PureComponent<
  MinicartItemProps & MinicartItemDispatchToProps,
  MinicartItemState
> {
  constructor(props: MinicartItemProps & MinicartItemDispatchToProps) {
    super(props);

    this.state = {
      product: props.product,
      index: props.index,
    };
  }
  getProductPrice() {
    const { product } = this.state;

    return product.price.amount.toFixed(2);
  }

  handleQtyChange = (value: number) => {
    const { index, updateCartItemQty } = this.props;

    updateCartItemQty({ index, value });
  };

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

  renderTextAttribute(attribute: ProductAttribute): ReactElement[] {
    const { selectedAttributes } = this.state.product;
    return attribute.items.map((item, i) => {
      const isSelected =
        selectedAttributes[attribute.attribute_code] === item.value;
      return (
        <Fragment key={i}>
          <button
            className={`
                ${isSelected ? "text-white bg-black" : "bg-white text-black"}
                px-1 py-0.5  border text-sm font-normal`}
            data-testid={`cart-item-attribute-${attribute.name.toLowerCase()}-${item.value.toLowerCase()}${
              isSelected ? "-selected" : ""
            }`}
            name={attribute.name}
            value={item.value}
            disabled
            id={`${attribute.type}-${item.value}`}
          >
            {item.value}
          </button>
        </Fragment>
      );
    });
  }

  renderSwatchAttribute(attribute: ProductAttribute): ReactElement[] {
    const { selectedAttributes } = this.state.product;

    return attribute.items.map((item: AttributeItem, i) => {
      const isSelected =
        selectedAttributes[attribute.attribute_code] === item.value;
      return (
        <Fragment key={i}>
          <button
            style={{ backgroundColor: item.value }}
            className={`w-4 h-4 outline outline-offset-2 border ${
              isSelected ? "outline-btn-primary" : "outline-transparent"
            }`}
            data-testid={`cart-item-attribute-${attribute.name.toLowerCase()}-${item.value.toLowerCase()}${
              isSelected ? "-selected" : ""
            }`}
            name={attribute.name}
            value={item.value}
            id={`${attribute.type}-${item.value}`}
          />
        </Fragment>
      );
    });
  }

  renderAttributes(): ReactElement[] {
    const { product } = this.state;

    if (product.attributes.length === 0) {
      return [];
    }

    return product.attributes.map((attribute: ProductAttribute) => {
      return (
        <div
          data-testid={`cart-item-attribute-${attribute.name}`}
          key={attribute.attribute_code}
          className="flex flex-col gap-2"
        >
          <span className="text-sm font-normal">{attribute.name}</span>
          <div className="flex flex-row gap-2">
            {this.getAttributeRenderer(attribute)(attribute)}
          </div>
        </div>
      );
    });
  }

  renderQty(): ReactElement {
    const { product } = this.props;
    return (
      <div className="flex flex-col justify-between">
        <button
          onClick={() => this.handleQtyChange(1)}
          className="w-6 h-6 border text-sm text-black"
          data-testid="cart-item-amount-increase"
        >
          +
        </button>
        <span className="w-6 h-6 text-center" data-testid="cart-item-amount">
          {product.qty}
        </span>
        <button
          onClick={() => this.handleQtyChange(-1)}
          className="w-6 h-6 border text-sm text-black"
          data-testid="cart-item-amount-decrease"
        >
          -
        </button>
      </div>
    );
  }

  render(): ReactNode {
    const { product } = this.state;
    return (
      <div className="flex gap-2 align-center">
        <div className="flex flex-col text-left w-full">
          <Link to={`/product/${product.sku}`} className="text-lg font-light">
            {product.name}
          </Link>
          <div>
            {product.price.currency_symbol}
            {this.getProductPrice()}
          </div>
          {this.renderAttributes()}
        </div>
        {this.renderQty()}
        <div className="flex">
          <img
            className="w-[120px] h-[125px] m-auto object-contain"
            src={product.thumbnail}
            alt={product.name}
          />
        </div>
      </div>
    );
  }
}

interface MinicartItemDispatchToProps {
  updateCartItemQty: (payload: { index: number; value: number }) => void;
}

const mapDispatchToProps = (
  dispatch: AppDispatch
): MinicartItemDispatchToProps => ({
  updateCartItemQty: (payload: { index: number; value: number }) =>
    dispatch(updateCartItemQty(payload)),
});

export default connect(null, mapDispatchToProps)(MinicartItem);

import { PureComponent, ReactElement, Suspense } from "react";
import { AppDispatch, RootState } from "../../store";
import { connect } from "react-redux";
import { withParams } from "../../util/withParams";
import { fetchProductPage } from "../../store/ProductPage/ProductPage.action";
import ProductGallery from "../../component/ProductGallery/ProductGallery";
import ProductDetails from "../../component/ProductDetails/ProductDetails";
import { Product } from "../../store/ProductPage/Product.type";

interface ProductPageProps {
  params?: { sku: string };
  fetchProduct: (sku: string) => void;
  product: Product | null;
  loading: boolean;
}

class ProductPage extends PureComponent<ProductPageProps> {
  componentDidMount(): void {
    const { params, fetchProduct } = this.props;

    if (params?.sku) {
      fetchProduct(params.sku);
    }
  }

  componentDidUpdate(
    prevProps: Readonly<ProductPageProps>
  ): void {
    const { params, fetchProduct } = this.props;
    const prevSku = prevProps.params?.sku;

    if (params?.sku && params.sku !== prevSku) {
      fetchProduct(params.sku);
    }
  }

  renderProductGallery(product: Product): ReactElement {
    return <ProductGallery gallery={product.gallery} />;
  }

  renderProductDetails(product: Product): ReactElement {
    return <ProductDetails product={product} />;
  }

  render(): ReactElement {
    const { loading, product } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <main
          className="mx-auto max-w-[1280px] gap-3 px-4 sm:px-6 lg:px-8 py-8
         flex flex-col md:flex-row items-center lg:items-start justify-between"
        >
          {this.renderProductGallery(product)}
          {this.renderProductDetails(product)}
        </main>
      </Suspense>
    );
  }
}

interface ProductPageMapDispatchProps {
  fetchProduct: (sku: string) => void;
}

interface ProductPageMapStateProps {
  product: Product | null;
  loading: boolean;
}

const mapStateToProps = (state: RootState): ProductPageMapStateProps => ({
  product: state.productReducer.product,
  loading: state.productReducer.loading,
});

const mapDispatchToProps = (
  dispatch: AppDispatch
): ProductPageMapDispatchProps => ({
  fetchProduct: (sku: string) => dispatch(fetchProductPage(sku)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withParams(connector(ProductPage));

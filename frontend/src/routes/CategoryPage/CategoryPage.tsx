import { PureComponent } from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchCategoryPage } from "../../store/CategoryPage/Category.action";
import ProductCard from "../../component/ProductCard/ProductCard";
import { withParams } from "../../util/withParams";
import { CategoryInterface } from "../../store/Navigation/Navigation.type";
import { CategoryPageResponse } from "../../store/CategoryPage/Category.type";
import { Product } from "../../store/ProductPage/Product.type";

interface CategoryPageProps {
  params?: { key: string };
  activeCategory?: CategoryInterface;
  items?: CategoryPageResponse;
  fetchCategoryPage: (categoryId?: number) => void;
}

class CategoryPage extends PureComponent<CategoryPageProps> {
  componentDidMount() {
    const { activeCategory, fetchCategoryPage } = this.props;

    if (activeCategory) {
      fetchCategoryPage(activeCategory.id);
    } else {
      fetchCategoryPage();
    }
  }

  componentDidUpdate(prevProps: CategoryPageProps) {
    if (
      prevProps.activeCategory !== this.props.activeCategory &&
      this.props.activeCategory
    ) {
      this.props.fetchCategoryPage(this.props.activeCategory.id);
    }
  }

  renderProductCard() {
    const { items } = this.props;
    return items?.category?.products.map((product: Product) => (
      <ProductCard key={product.id} product={product} />
    ));
  }

  render() {
    const { items, activeCategory } = this.props;
    return (
      <div className="container mx-auto px-4 sm:px-6">
        <h1 className="text-left text-[35px] font-normal not-italic my-20 capitalize">
          {activeCategory?.name}
        </h1>
        <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-3">
          {items?.category?.products &&
            items.category.products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    );
  }
}

interface CategoryPageMapDispatchProps {
  fetchCategoryPage: (categoryId?: number) => void;
}

interface CategoryPageMapStateProps {
  activeCategory?: CategoryInterface;
  items?: CategoryPageResponse;
}

const mapStateToProps = (state: RootState): CategoryPageMapStateProps => ({
  activeCategory: state.navigationReducer.activeCategory,
  items: state.categoryReducer.items,
});

const mapDispatchToProps = (
  dispatch: AppDispatch
): CategoryPageMapDispatchProps => ({
  fetchCategoryPage: (categoryId?: number) =>
    dispatch(fetchCategoryPage(categoryId)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withParams(connector(CategoryPage));

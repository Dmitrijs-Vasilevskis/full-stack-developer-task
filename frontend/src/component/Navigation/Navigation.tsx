import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../store/index";
import { setActiveCategory } from "../../store/Navigation/Navigation.reducer";
import { fetchCategoriesRequest } from "../../store/Navigation/Navigation.action";
import { withParams } from "../../util/withParams";
import { NavLink } from "react-router-dom";
import { CategoryInterface } from "../../store/Navigation/Navigation.type";

interface NavigationProps {
  params?: { category: string };
  categories: CategoryInterface[];
  activeCategory?: CategoryInterface;
  fetchCategoriesRequest: () => void;
  setActiveCategory: (category: CategoryInterface) => void;
}

class Navigation extends PureComponent<NavigationProps> {
  componentDidMount() {
    const { fetchCategoriesRequest } = this.props;
    fetchCategoriesRequest();
  }

  componentDidUpdate(
    prevProps: Readonly<NavigationProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    const { activeCategory, setActiveCategory, categories, params } =
      this.props;

    if (!activeCategory && categories.length > 0 && params?.category) {
      const activeCategory = categories.find(
        (categoryItem) => categoryItem.name === params.category
      );

      if (activeCategory) {
        setActiveCategory(activeCategory);
      }
    }
  }

  onCategoryClick = (category: CategoryInterface) => {
    const { setActiveCategory } = this.props;
    setActiveCategory(category);
  };

  isActiveCategory = (category: CategoryInterface): boolean => {
    const { activeCategory } = this.props;
    return activeCategory?.id === category.id;
  };

  render(): React.ReactNode {
    const { categories, activeCategory } = this.props;
    return (
      <div>
        <nav>
          <ul className="flex flex-row">
            {categories.map((category: CategoryInterface) => (
              <li key={category.id} className="px-4">
                <NavLink
                  data-testid={`${
                    activeCategory?.id === category.id
                      ? "active-category-link"
                      : "category-link"
                  }`}
                  className={({ isActive }) =>
                    `text-base uppercase px-5 py-3.5 ${
                      isActive
                        ? "text-btn-primary border-b-2 border-btn-primary"
                        : ""
                    }`
                  }
                  to={`/${category.url_key}`}
                  onClick={() => this.onCategoryClick(category)}
                >
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}

interface NavigationMapStateProps {
  categories: CategoryInterface[];
  activeCategory?: CategoryInterface;
}

interface NavigationMapDispatchProps {
  setActiveCategory: (category: CategoryInterface) => void;
  fetchCategoriesRequest: () => void;
}

const mapStateToProps = (state: RootState): NavigationMapStateProps => ({
  categories: state.navigationReducer.categories,
  activeCategory: state.navigationReducer.activeCategory,
});

const mapDispatchToProps = (
  dispatch: AppDispatch
): NavigationMapDispatchProps => ({
  setActiveCategory: (category: CategoryInterface) =>
    dispatch(setActiveCategory(category)),
  fetchCategoriesRequest: () => dispatch(fetchCategoriesRequest()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default withParams(connector(Navigation));

import { PureComponent } from "react";
import LeftArrow from "../../assets/left-arrow.svg";
import RightArrow from "../../assets/right-arrow.svg";

interface ProductGalleryProps {
  gallery: {
    images: string[];
  };
}

interface ProductGalleryState {
  currentImage: number;
}

class ProductGallery extends PureComponent<
  ProductGalleryProps,
  ProductGalleryState
> {
  constructor(props: ProductGalleryProps & ProductGalleryState) {
    super(props);

    this.state = {
      currentImage: 0,
    };
  }

  onGalleryImageClick = (index: number) => {
    this.setState({ currentImage: index });
  };

  handleNextImage = () => {
    this.setState({ currentImage: this.state.currentImage + 1 });
  };
  handlePreviousImage = () => {
    this.setState({ currentImage: this.state.currentImage - 1 });
  };

  render() {
    const { gallery } = this.props;
    const { currentImage } = this.state;

    return (
      <section
        className="product-gallery flex flex-col-reverse md:flex-row gap-5 md:max-h-[480px]"
        data-testid="product-gallery"
      >
        <div className="relative flex mx-4 md:mx-0 flex-row md:flex-col gap-4 overflow-auto">
          {gallery &&
            gallery.images.map((image, index) => (
              <img
                key={index}
                src={image}
                onClick={() => this.onGalleryImageClick(index)}
                alt="product"
                className="w-20 md:w-auto h-20 object-cover aspect-square object-[50%_0]"
              />
            ))}
        </div>
        <div className="relative">
          <div className="absolute top-[50%] left-0">
            <button
              className="w-8 h-8 flex items-center justify-center bg-black opacity-50 ml-4"
              onClick={this.handlePreviousImage}
              disabled={currentImage === 0}
            >
              <img src={LeftArrow} alt="left-arrow" />
            </button>
          </div>

          <img
            className="object-contain w-full h-[480px] aspect-3/2"
            src={gallery?.images[currentImage]}
            alt="product"
          />

          <div className="absolute top-[50%] right-0">
            <button
              className="w-8 h-8 flex items-center justify-center bg-black opacity-50 mr-4"
              onClick={this.handleNextImage}
              disabled={currentImage === gallery?.images.length - 1}
            >
              <img src={RightArrow} alt="right-arrow" />
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default ProductGallery;

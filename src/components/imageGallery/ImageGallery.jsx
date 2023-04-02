import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
// const { Component } = require('react');

const ImageGallery = ({ photos, bigPhoto }) => {
  return (
    <ul className={css.ImageGallery}>
      {photos.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            imageURL={image.webformatURL}
            imageLarge={image.largeImageURL}
            imageTags={image.tags}
            onClick={bigPhoto}
          ></ImageGalleryItem>
        );
      })}
    </ul>
  );
};

// class ImageGallery extends Component {
//   render() {
//     const { photos, bigPhoto } = this.props;
//     return (
//       <ul className={css.ImageGallery}>
//         {photos.map(image => {
//           return (
//             <ImageGalleryItem
//               key={image.id}
//               imageURL={image.webformatURL}
//               imageLarge={image.largeImageURL}
//               imageTags={image.tags}
//               onClick={bigPhoto}
//             ></ImageGalleryItem>
//           );
//         })}
//       </ul>
//     );
//   }
// }

export default ImageGallery;

ImageGallery.propTypes = {
  photos: PropTypes.array,
  bigPhoto: PropTypes.func,
};

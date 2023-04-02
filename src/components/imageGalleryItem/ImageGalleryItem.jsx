import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
// const { Component } = require('react');

const ImageGalleryItem = ({ imageURL, imageTags, onClick, imageLarge }) => {
  return (
    <li onClick={onClick} className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={imageURL}
        alt={imageTags}
        bigpicture={imageLarge}
      ></img>
    </li>
  );
};

// class ImageGalleryItem extends Component {
//   render() {
//     const { imageURL, imageTags, onClick, imageLarge } = this.props;
//     return (
//       <li onClick={onClick} className={css.ImageGalleryItem}>
//         <img
//           className={css.ImageGalleryItemImage}
//           src={imageURL}
//           alt={imageTags}
//           bigpicture={imageLarge}
//         ></img>
//       </li>
//     );
//   }
// }

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string,
  imageTags: PropTypes.string,
  onClick: PropTypes.func,
  imageLarge: PropTypes.string,
};

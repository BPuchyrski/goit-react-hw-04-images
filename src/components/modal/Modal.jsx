import PropTypes from 'prop-types';
import css from './Modal.module.css';
// const { Component } = require('react');

const Modal = ({ image, modalFunction, modalRef }) => {
  return (
    <div
      ref={modalRef}
      onClick={modalFunction}
      className={css.Overlay}
      name="overlay"
    >
      <div className={css.Modal}>
        <img src={image} alt="ModalImage" />
      </div>
    </div>
  );
};

// class Modal extends Component {
//   render() {
//     const { image, modalFunction } = this.props;
//     return (
//       <div onClick={modalFunction} className={css.Overlay} name = 'overlay'>
//         <div className={css.Modal}>
//           <img src={image} alt="ModalImage" />
//         </div>
//       </div>
//     );
//   }
// }
export default Modal;

Modal.propTypes = {
  image: PropTypes.string,
  modalFunction: PropTypes.func,
};

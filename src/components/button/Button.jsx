import css from './Button.module.css';
import PropTypes from 'prop-types';
// const { Component } = require('react');

const Button = ({ onClick }) => {
  return (
    <div className={css.ButtonDiv}>
      <button onClick={onClick} className={css.Button}>
        Load more
      </button>
    </div>
  );
};

// class Button extends Component {
//   render() {
//     const { onClick } = this.props;
//     return (
//       <div className={css.ButtonDiv}>
//         <button onClick={onClick} className={css.Button}>
//           Load more
//         </button>
//       </div>
//     );
//   }
// }

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
};

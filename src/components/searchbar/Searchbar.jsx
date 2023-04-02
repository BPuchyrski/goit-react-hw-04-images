import PropTypes from 'prop-types';
import css from './Section.module.css';
// const { Component } = require('react');

const Searchbar = ({ onSubmit }) => {
  return (
    <header className={css.searchbar}>
      <form onSubmit={onSubmit} className={css.searchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className="button-label">Search</span>
        </button>

        <input
          name="searchFormInput"
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

// class Searchbar extends Component {
//   render() {
//     const { onSubmit } = this.props;
//     return (
//       <header className={css.searchbar}>
//         <form onSubmit={onSubmit} className={css.searchForm}>
//           <button type="submit" className={css.SearchFormButton}>
//             <span className="button-label">Search</span>
//           </button>

//           <input
//             name="searchFormInput"
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// }
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

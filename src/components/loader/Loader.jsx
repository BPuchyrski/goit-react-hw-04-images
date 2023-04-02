import css from './Loader.module.css'
import { BallTriangle } from 'react-loader-spinner';
const { Component } = require('react');

class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#3f51b5"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }
}

export default Loader;

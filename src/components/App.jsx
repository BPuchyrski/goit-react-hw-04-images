import Searchbar from './searchbar/Searchbar';
import Loader from './loader/Loader';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
// eslint-disable-next-line no-unused-vars
import { useEffect, useState, Component } from 'react';
import axios from 'axios';
import Modal from './modal/Modal';

// const apiKey = '33158907-0652e41e9f508e65904cd564d';

export function App() {
  const [isLoaderOn, setIsLoaderOn] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);
  const [bigImageModal, setBigImageModal] = useState('');

  const getInput = async e => {
    e.preventDefault();
    setIsLoaderOn(true);
    const inputValueHandler = e.target.elements.searchFormInput.value;
    if (inputValueHandler === '' || inputValue === inputValueHandler) {
      setIsLoaderOn(false);
    } else {
      setPhotos([]);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${inputValueHandler}&page=${1}&key=33158907-0652e41e9f508e65904cd564d&image_type=photo&orientation=horizontal&per_page=12`
      );
      setPhotos(response.data.hits);
      setIsLoaderOn(false);
      setInputValue(inputValueHandler);
      setPage(1);
    }
  };

  const loadMore = async () => {
    setIsLoaderOn(true);
    const response = await axios.get(
      `https://pixabay.com/api/?q=${inputValue}&page=${
        page + 1
      }&key=33158907-0652e41e9f508e65904cd564d&image_type=photo&orientation=horizontal&per_page=12`
    );
    setPhotos([...photos, ...response.data.hits]);
    setPage(page + 1);
    setIsLoaderOn(false);
  };

  const modalToggle = () => {
    setIsModalOn(!isModalOn);
  };

  const getBigImg = e => {
    setBigImageModal(e.target.attributes[3].value);
    modalToggle();
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isModalOn) {
        modalToggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOn]);

  const closeModal = e => {
    if (e.target.attributes[1].value === 'overlay') {
      modalToggle();
    }
  };

  return (
    <div>
      <Searchbar onSubmit={getInput}></Searchbar>
      {isLoaderOn && <Loader></Loader>}
      <ImageGallery bigPhoto={getBigImg} photos={photos}></ImageGallery>
      {photos.length > 0 && <Button onClick={loadMore}></Button>}
      {isModalOn && (
        <Modal modalFunction={closeModal} image={bigImageModal}></Modal>
      )}
    </div>
  );
}

// export class App extends Component {
//   state = {
//     isLoaderOn: false,
//     photos: [],
//     page: 1,
//     inputValue: '',
//     isModalOn: false,
//     bigImageModal: '',
//   };

//   getInput = async e => {
//     e.preventDefault();
//     this.setState({ isLoaderOn: true });
//     let inputValue = e.target.elements.searchFormInput.value;
//     if (inputValue === '' || this.state.inputValue === inputValue) {
//       this.setState({ isLoaderOn: false });
//     } else {
//       await this.setState({ photos: [] });
//       const response = await axios.get(
//         `https://pixabay.com/api/?q=${inputValue}&page=${this.state.page}&key=33158907-0652e41e9f508e65904cd564d&image_type=photo&orientation=horizontal&per_page=12`
//       );
//       const newPhotos = [...response.data.hits];
//       this.setState({
//         photos: newPhotos,
//         isLoaderOn: false,
//         inputValue: inputValue,
//       });
//     }
//   };

//   loadMore = async e => {
//     await this.setState(prev => {
//       return { page: prev.page + 1, isLoaderOn: true };
//     });
//     const response = await axios.get(
//       `https://pixabay.com/api/?q=${this.state.inputValue}&page=${this.state.page}&key=33158907-0652e41e9f508e65904cd564d&image_type=photo&orientation=horizontal&per_page=12`
//     );
//     const newPhotos = [...this.state.photos, ...response.data.hits];
//     this.setState({
//       photos: newPhotos,
//       isLoaderOn: false,
//     });
//   };

//   modalToggle = e => {
//     this.setState(prev => ({ isModalOn: !prev.isModalOn }));
//   };

//   getBigImg = e => {
//     console.log(e.target.attributes[3].value);
//     this.setState({ bigImageModal: e.target.attributes[3].value });
//     this.modalToggle();
//     console.log(this.state.bigImageModal);
//   };

//   componentDidMount() {
//     document.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.key === 'Escape' && this.state.isModalOn) {
//       this.modalToggle();
//     }
//   };

//   closeModal = e => {
//     if (e.target.attributes[1].value === 'overlay') {
//       this.modalToggle();
//     }
//     console.log(e.target.attributes[1].value);
//   };
//   render() {
//     return (
//       <div>
//         <Searchbar onSubmit={this.getInput}></Searchbar>
//         {this.state.isLoaderOn && <Loader></Loader>}
//         <ImageGallery
//           bigPhoto={this.getBigImg}
//           photos={this.state.photos}
//         ></ImageGallery>
//         {this.state.photos.length > 0 && (
//           <Button onClick={this.loadMore}></Button>
//         )}
//         {this.state.isModalOn && (
//           <Modal
//             modalFunction={this.closeModal}
//             image={this.state.bigImageModal}
//           ></Modal>
//         )}
//       </div>
//     );
//   }
// }

import Searchbar from './searchbar/Searchbar';
import Loader from './loader/Loader';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Modal from './modal/Modal';

// const apiKey = '33158907-0652e41e9f508e65904cd564d';

export const App = () => {
  const [isLoaderOn, setIsLoaderOn] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setImputValue] = useState('');
  const [isModalOn, setIsModalOn] = useState(false);
  const [bigImageModal, setBigImageModal] = useState('');

  const modalRef = useRef();

  const getInput = async e => {
    e.preventDefault();
    setIsLoaderOn(true);
    let inputValueHandle = e.target.elements.searchFormInput.value;
    if (inputValueHandle === '' || inputValue === inputValueHandle) {
      setIsLoaderOn(false);
    } else {
      await setPhotos([]);
      const response = await axios.get(
        `https://pixabay.com/api/?q=${inputValueHandle}&page=${page}&key=33158907-0652e41e9f508e65904cd564d&image_type=photo&orientation=horizontal&per_page=12`
      );
      const newPhotos = [...response.data.hits];
      setPhotos(newPhotos);
      setIsLoaderOn(false);
      setImputValue(inputValueHandle);
    }
  };

  const loadMore = async e => {
    await setPage(prev => prev + 1);
    await setIsLoaderOn(true);
    const response = await axios.get(
      `https://pixabay.com/api/?q=${inputValue}&page=${page}&key=33158907-0652e41e9f508e65904cd564d&image_type=photo&orientation=horizontal&per_page=12`
    );
    const newPhotos = [...photos, ...response.data.hits];
    setPhotos(newPhotos);
    setIsLoaderOn(false);
  };

  const modalToggle = e => {
    setIsModalOn(prev => !prev);
    // this.setState(prev => ({ isModalOn: !prev.isModalOn }));
  };

  const getBigImg = e => {
    // console.log(e.target.attributes[3].value);
    setBigImageModal(e.target.attributes[3].value);
    modalToggle();
    console.log(bigImageModal);
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape' && isModalOn) {
      modalToggle();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = e => {
    if (modalRef.current.attributes[1].value === 'overlay') {
      modalToggle();
    }
    // console.log(e.target.attributes[1].value);
    console.log(modalRef.current.attributes[1].value);
  };

  return (
    <div>
      <Searchbar onSubmit={getInput}></Searchbar>
      {isLoaderOn && <Loader></Loader>}
      <ImageGallery bigPhoto={getBigImg} photos={photos}></ImageGallery>
      {photos.length > 0 && <Button onClick={loadMore}></Button>}
      {isModalOn && (
        <Modal
          modalRef={modalRef}
          modalFunction={closeModal}
          image={bigImageModal}
        ></Modal>
      )}
    </div>
  );
};

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

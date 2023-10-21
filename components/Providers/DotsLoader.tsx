import {ThreeDots} from 'react-loader-spinner'

const DotsLoader = () => {
  return (
    <ThreeDots
      height="30"
      width="30"
      radius="9"
      color="#fff"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      visible={true}
    />
  );
};

export default DotsLoader;

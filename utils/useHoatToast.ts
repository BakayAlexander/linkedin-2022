import toast from 'react-hot-toast';

const useHoatToast = () => {
  const toast_red = {
    background: '#a3ffd5',
    color: 'black',
    fontWeight: 'semi-bold',
    fontSize: '16px',
    padding: '15px',
    borderRadius: '9999px',
    maxWidth: '1000px',
  };

  toast(`Alexander Bakay currently working on this function`, {
    duration: 2000,
    style: toast_red,
  });

  return;
};

export default useHoatToast;

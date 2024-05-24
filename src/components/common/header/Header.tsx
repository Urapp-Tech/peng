import { useNavigate } from 'react-router-dom';
import assets from '../../../assets';

function Header() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-primary py-[30px]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent   disabled:pointer-events-none"
        >
          <img src={assets.images.leftArrow} alt="leftArrow" />
        </button>
        <div className="mx-[20px]">
          <img src={assets.images.logo} alt="logo" />
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-transparent disabled:pointer-events-none"
        >
          <img src={assets.images.cross} alt="cross" />
        </button>
      </div>
    </div>
  );
}

export default Header;

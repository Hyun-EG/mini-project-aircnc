import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/images/logo.svg';
import logoSmall from '../../assets/images/logo-small.svg';

const HeaderLogoImage = styled.img`
  cursor: pointer;
  @media (max-width: 768px) {
    width: 8vh;
    height: 8vh;
  }
  @media (max-width: 600px) {
    width: 4vh;
    height: 4vh;
    margin: 0 1vh;
  }
`;

interface LogoProps {
  windowWidth: number;
}

function HeaderLogo({ windowWidth }: LogoProps) {
  const navigate = useNavigate();

  if (windowWidth <= 600) {
    return (
      <HeaderLogoImage
        onClick={() => {
          navigate('/');
        }}
        src={logoSmall}
        alt="Logo"
      />
    );
  }

  return (
    <HeaderLogoImage
      onClick={() => {
        navigate('/');
      }}
      src={logo}
      alt="Logo"
    />
  );
}

export default HeaderLogo;

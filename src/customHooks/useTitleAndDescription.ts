import {useEffect} from 'react';
import setTitleAndDescription, {
  TitleAndDescription,
} from '../lib/setTitleAndDescription';
import mojoLogo from '../assets/images/mojo-circle-logo-black-white-hq.png';

const useTitleAndDescription = ({
  title,
  description,
  image = mojoLogo,
}: TitleAndDescription): void => {
  // Only run the effect on first render
  useEffect(() => {
    setTitleAndDescription({title, description, image});
  }, []);
};

export default useTitleAndDescription;

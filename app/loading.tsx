import { PropagateLoader } from 'react-spinners';
import css from './page.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <PropagateLoader size={20} color="#9fb7ce" />
    </div>
  );
};

export default Loader;

import { FC, useState, useRef, useCallback, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

//Redux toolkit
import { filterSelector, setSearchValue, setValue } from '../../redux/slices/filterSlice';

//styles
import styles from './Search.module.scss';

//icons
import { GiMagnifyingGlass } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface ISearchProps {
  paginateReset: () => void;
}

const Search: FC<ISearchProps> = ({ paginateReset }) => {
  const dispatch = useDispatch();
  const { value } = useSelector(filterSelector);
  //const [value, setValue] = useState<string>(searchValue);
  const searchRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    dispatch(setValue(''));
    searchRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
      paginateReset();
    }, 500),
    [],
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setValue(e.target.value));
    //dispatch(setSearchValue(e.target.value));
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.search}>
      <GiMagnifyingGlass className={styles.search__icon} color="#2a5c5d" />
      <input
        ref={searchRef}
        value={value}
        onChange={onChangeInput}
        type="text"
        placeholder="Поиск..."
      />
      {value && (
        <AiOutlineCloseCircle
          onClick={onClickClear}
          className={styles.search__close}
          color="#2a5c5d"
        />
      )}
    </div>
  );
};

export default Search;

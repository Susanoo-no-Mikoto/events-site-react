import { FC, useState, useRef, useCallback, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

//Redux toolkit
import { setSearchValue } from '../../redux/slices/filterSlice';

//styles
import styles from './Search.module.scss';

//icons
import { GiMagnifyingGlass } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Search: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  const searchRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    searchRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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

import { FC } from 'react';
import { useSelector } from 'react-redux';

//Redux toolkit
import { loginSelector } from '../redux/slices/loginSlice';

const PersonalData: FC = () => {
  const { dataUser } = useSelector(loginSelector);
  return (
    <div className="container">
      <div className="personalData">
        <p>{dataUser?.user.name}</p>
        <p>{dataUser?.user.surname}</p>
        <p>{dataUser?.user.email}</p>
        <p>{dataUser?.user.access}</p>
      </div>
    </div>
  );
};

export default PersonalData;

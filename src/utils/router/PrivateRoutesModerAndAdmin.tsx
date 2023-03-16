import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Redux toolkit
import { loginSelector } from '../../redux/slices/loginSlice';

const PrivateRouteModer: FC = () => {
  const { dataUser } = useSelector(loginSelector);
  return dataUser?.user.access === 'Moder' || dataUser?.user.access === 'Admin' ? (
    <Outlet />
  ) : (
    <Navigate to="*" />
  );
};

export default PrivateRouteModer;

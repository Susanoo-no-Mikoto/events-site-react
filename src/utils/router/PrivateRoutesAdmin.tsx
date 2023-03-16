import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Redux toolkit
import { loginSelector } from '../../redux/slices/loginSlice';

const PrivateRouteAdmin: FC = () => {
  const { dataUser } = useSelector(loginSelector);

  return dataUser?.user.access === 'Admin' ? <Outlet /> : <Navigate to="*" />;
};

export default PrivateRouteAdmin;

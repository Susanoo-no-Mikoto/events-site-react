import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Redux toolkit
import { loginSelector } from '../../redux/slices/loginSlice';

const PrivateRouteAuthUser: FC = () => {
  const { dataUser } = useSelector(loginSelector);

  return dataUser?.accessToken ? <Outlet /> : <Navigate to="*" />;
};

export default PrivateRouteAuthUser;

import { FC } from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: FC = (props) => {
  return (
    <ContentLoader
      speed={2}
      width="1272"
      height="90"
      viewBox="0 0 1272 90"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <rect x="0" y="0" rx="25" ry="25" width="100%" height="19" />
      <rect x="0" y="29" rx="25" ry="25" width="216" height="19" />
      <rect x="80%" y="55" rx="25" ry="25" width="20%" height="19" />
    </ContentLoader>
  );
};

export default Skeleton;

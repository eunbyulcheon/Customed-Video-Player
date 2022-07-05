import type { NextPage } from 'next';
import Layout from '../layout/Layout';
import Video from '../components/Video';

const Home: NextPage = () => {
  return (
    <Layout>
      <Video />
    </Layout>
  );
};

export default Home;

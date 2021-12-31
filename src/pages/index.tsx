import { withSSRGuest } from 'utils/withSSRGuest';
import SignIn from '../templates/SignIn';

export default function Home() {
  return <SignIn />;
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});

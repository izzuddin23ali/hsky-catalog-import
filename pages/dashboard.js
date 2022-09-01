import Layout from "../components/MainLayout/Layout";
import { withSessionSsr } from "../lib/auth/withSession";
import FileUpload from "../components/Forms/Upload";

export default function Dashboard({ user }) {
  const name = user.full_name;
  return (
    <Layout title="Dashboard" session={user}>
      <div className="container">
        <FileUpload />
      </div>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
    return {
      props: {
        user: req.session.user,
      },
    };
  }
);

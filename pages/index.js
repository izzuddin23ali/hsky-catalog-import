import Layout from "../components/MainLayout/Layout";
import LoginForm from "../components/Forms/Login";
import CatalogBox from "../components/CatalogBox";
import { withSessionSsr } from "../lib/auth/withSession";

export default function Home(props) {
  const catalogURL = props.catalogURL;
  return (
    <Layout title="Home">
      <div className="container py-5 px-4 px-md-0">
        <LoginForm />
        {catalogURL && (
          <div className="mt-5">
            <CatalogBox catalogUrl={catalogURL} />
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const catalogURL = process.env.MAIN_CATALOG_URL;
    const user = req.session.user;
    if (!user) {
      return {
        props: {
          catalogURL: catalogURL,
          user: null,
        },
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }
);

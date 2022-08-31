import Layout from "../components/MainLayout/Layout";
import LoginForm from "../components/Forms/Login";
import CatalogBox from "../components/CatalogBox";
import { withSessionSsr } from "../lib/auth/withSession";

export default function Home(props) {
  const catalogURL = props.catalogURL;
  return (
    <Layout title="Home">
      <div className="container py-5">
        <LoginForm />
        {catalogURL && (
          <div className="pt-4">
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
    return {
      props: {
        catalogURL: catalogURL,
      },
    };
  }
);

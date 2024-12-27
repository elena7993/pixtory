import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Pixtory</title>
    </Helmet>
  );
};

export default PageTitle;

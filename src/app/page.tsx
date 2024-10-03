import { data } from "./data";
import { ItemsList } from "./components/ItemsList";
import { FilterProvider } from "../app/components/FilterContext";

export async function generateStaticParams() {
  return data;
}
const Home = () => {
  return <ItemsList data={data} />;
};

export default Home;

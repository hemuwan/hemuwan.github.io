import fetchView from "@utils/fetchView.js";

const Home = async () => {
  const home = await fetchView('Home');

  return home;
}

export default Home;
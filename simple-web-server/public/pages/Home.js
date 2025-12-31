import fetchView from "@utils/fetchView.js";

const Home = async () => {
  const home = await fetchView('Home');

  home.render = () => {
    const title = home.querySelector('.title');
    title.animate(
      {
        opacity: [0, 1],
        transform: ["translateY(10px)", "translateY(0)"]
      },
      { duration: 500 }
    )
  }

  return home;
}

export default Home;
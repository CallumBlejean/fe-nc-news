import "../Components-CSS/Home.css"
import NCimg from "../assets/NCimg.jpg"

function Home() {
  return (
    <>
      <div>
        <h2 id="home-title">Welcome to NC News</h2>
      </div>
      <section className="home-body">
        <p>
          Welcome! Please read our articles for the latest reports!
        </p>
        <br />
        <img src={NCimg} alt="NC News home picture" id="NCimg"/>
      </section>
      <footer>
        <button>Sign in Account</button>
        <button>Explore Community</button>
      </footer>
    </>
  );
}

export default Home;

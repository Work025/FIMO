import Hero from "../Componentos/Hero"
import Main from "../Componentos/Main"
import Aside from "../Componentos/Aside"

function Home() {
    return (
        <div className="home">
            <Hero />
            <Main />
            <Aside />
        </div>
    )
}

export default Home;
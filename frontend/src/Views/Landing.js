import '../App.css';
import Home from "../Components/Home";
import About from "../Components/About";
import Testimonial from "../Components/Testimonial";

export default function Landing() {
    return (
        <div className="App">
            <Home />
            <About />
            <Testimonial />
        </div>
    );
}
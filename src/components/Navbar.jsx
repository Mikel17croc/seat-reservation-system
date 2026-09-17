import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Seat Reservation</h2>

            <div>
                <Link to="/">Seats</Link>
                <Link to="/reservations">
                    My Reservations
                </Link>
                <Link to="/events">
                    Event Log
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
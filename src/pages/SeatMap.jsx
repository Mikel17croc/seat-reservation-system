import {
    useEffect,
    useState
} from "react";

import Seat from "../components/Seat";

import {
    getSeats,
    placeHold,
    joinWaitlist
} from "../api";

function SeatMap() {
    const [email, setEmail] =
        useState("");

    const [seats, setSeats] =
        useState([]);

    const [selectedSeat, setSelectedSeat] =
        useState(null);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    async function loadSeats() {
        try {
            const data = await getSeats();
            setSeats(data.seats);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadSeats();

        const interval = setInterval(
            loadSeats,
            2000
        );

        return () =>
            clearInterval(interval);
    }, []);

    async function handleHold() {
        setError("");
        setMessage("");

        if (!email) {
            setError(
                "Please enter your email address."
            );
            return;
        }

        if (!selectedSeat) {
            setError(
                "Please select an available seat."
            );
            return;
        }

        try {
            const data = await placeHold(
                email,
                selectedSeat.seat_number
            );

            setMessage(
                `Seat ${data.reservation.seatNumber} held. ` +
                `Your hold code is ${data.reservation.holdCode}.`
            );

            setSelectedSeat(null);

            await loadSeats();
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleWaitlist() {
        setError("");
        setMessage("");

        if (!email) {
            setError(
                "Please enter your email address."
            );
            return;
        }

        try {
            await joinWaitlist(email);

            setMessage(
                "All seats are occupied. " +
                "You have joined the waitlist."
            );
        } catch (err) {
            setError(err.message);
        }
    }

    const availableSeats =
        seats.filter(
            seat =>
                seat.status === "AVAILABLE"
        );

    return (
        <div className="page">
            <h1>Event Seat Map</h1>

            <p>
                Select an available seat and
                place a temporary hold.
            </p>

            <div className="form-card">
                <label>
                    Email address
                </label>

                <input
                    type="email"
                    value={email}
                    onChange={e =>
                        setEmail(e.target.value)
                    }
                    placeholder="you@example.com"
                />
            </div>

            <div className="legend">
                <span>
                    <i className="available-dot" />
                    Available
                </span>

                <span>
                    <i className="held-dot" />
                    Held
                </span>

                <span>
                    <i className="confirmed-dot" />
                    Confirmed
                </span>
            </div>

            <div className="seat-grid">
                {seats.map(seat => (
                    <Seat
                        key={seat.seat_number}
                        seat={seat}
                        selected={
                            selectedSeat?.seat_number ===
                            seat.seat_number
                        }
                        onClick={setSelectedSeat}
                    />
                ))}
            </div>

            <div className="actions">
                {availableSeats.length > 0 ? (
                    <button
                        className="primary"
                        onClick={handleHold}
                    >
                        Hold Selected Seat
                    </button>
                ) : (
                    <button
                        className="secondary"
                        onClick={handleWaitlist}
                    >
                        Join Waitlist
                    </button>
                )}
            </div>

            {message && (
                <div className="success">
                    {message}
                </div>
            )}

            {error && (
                <div className="error">
                    {error}
                </div>
            )}
        </div>
    );
}

export default SeatMap;
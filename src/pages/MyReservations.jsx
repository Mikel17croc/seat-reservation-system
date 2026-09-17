import {
    useState
} from "react";

import {
    getReservations,
    confirmHold,
    extendHold,
    releaseHold
} from "../api";

function MyReservations() {
    const [email, setEmail] =
        useState("");

    const [reservations, setReservations] =
        useState([]);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    async function loadReservations() {
        try {
            const data =
                await getReservations(email);

            setReservations(
                data.reservations
            );
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleAction(
        action,
        holdCode
    ) {
        setError("");
        setMessage("");

        try {
            let result;

            if (action === "confirm") {
                result = await confirmHold(
                    email,
                    holdCode
                );
            }

            if (action === "extend") {
                result = await extendHold(
                    email,
                    holdCode
                );
            }

            if (action === "release") {
                result = await releaseHold(
                    email,
                    holdCode
                );
            }

            setMessage(
                result.message ||
                "Action completed."
            );

            await loadReservations();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="page">
            <h1>My Reservations</h1>

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

                <button
                    className="primary"
                    onClick={loadReservations}
                >
                    Find Reservations
                </button>
            </div>

            {reservations.map(
                reservation => (
                    <div
                        className="reservation-card"
                        key={reservation.id}
                    >
                        <h3>
                            Seat {reservation.seat_number}
                        </h3>

                        <p>
                            Status:{" "}
                            <strong>
                                {reservation.status}
                            </strong>
                        </p>

                        <p>
                            Hold Code:{" "}
                            <strong>
                                {reservation.hold_code}
                            </strong>
                        </p>

                        {reservation.status ===
                            "HELD" && (
                                <div className="actions">
                                    <button
                                        onClick={() =>
                                            handleAction(
                                                "confirm",
                                                reservation.hold_code
                                            )
                                        }
                                    >
                                        Confirm
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleAction(
                                                "extend",
                                                reservation.hold_code
                                            )
                                        }
                                    >
                                        Extend
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleAction(
                                                "release",
                                                reservation.hold_code
                                            )
                                        }
                                    >
                                        Release
                                    </button>
                                </div>
                            )}

                        {reservation.status ===
                            "CONFIRMED" && (
                                <button
                                    onClick={() =>
                                        handleAction(
                                            "release",
                                            reservation.hold_code
                                        )
                                    }
                                >
                                    Release Seat
                                </button>
                            )}
                    </div>
                )
            )}

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

export default MyReservations;
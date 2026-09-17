import {
    useEffect,
    useState
} from "react";

import { getEvents } from "../api";

function EventLog() {
    const [events, setEvents] =
        useState([]);

    const [error, setError] =
        useState("");

    async function loadEvents() {
        try {
            const data =
                await getEvents();

            setEvents(data.events);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadEvents();

        const interval = setInterval(
            loadEvents,
            2000
        );

        return () =>
            clearInterval(interval);
    }, []);

    return (
        <div className="page">
            <h1>Event Log</h1>

            <p>
                This is the append-only record
                of reservation state changes.
            </p>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            <div className="event-list">
                {events.map(event => (
                    <div
                        className="event-card"
                        key={event.id}
                    >
                        <div>
                            <strong>
                                {event.event_type}
                            </strong>
                        </div>

                        <div>
                            {event.timestamp}
                        </div>

                        {event.seat_number && (
                            <div>
                                Seat:{" "}
                                {event.seat_number}
                            </div>
                        )}

                        {event.email && (
                            <div>
                                Email: {event.email}
                            </div>
                        )}

                        <pre>
                            {JSON.stringify(
                                event.payload,
                                null,
                                2
                            )}
                        </pre>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventLog;
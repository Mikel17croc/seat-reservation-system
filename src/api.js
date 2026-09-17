const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000/api";

async function request(
    endpoint,
    options = {}
) {
    const response = await fetch(
        `${API_URL}${endpoint}`,
        {
            headers: {
                "Content-Type":
                    "application/json",
                ...(options.headers || {})
            },
            ...options
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Something went wrong."
        );
    }

    return data;
}

export function getSeats() {
    return request("/seats");
}

export function placeHold(
    email,
    seatNumber
) {
    return request("/holds", {
        method: "POST",
        body: JSON.stringify({
            email,
            seatNumber
        })
    });
}

export function confirmHold(
    email,
    holdCode
) {
    return request("/holds/confirm", {
        method: "POST",
        body: JSON.stringify({
            email,
            holdCode
        })
    });
}

export function extendHold(
    email,
    holdCode
) {
    return request("/holds/extend", {
        method: "POST",
        body: JSON.stringify({
            email,
            holdCode
        })
    });
}

export function releaseHold(
    email,
    holdCode
) {
    return request("/holds/release", {
        method: "POST",
        body: JSON.stringify({
            email,
            holdCode
        })
    });
}

export function getReservations(email) {
    return request(
        `/reservations?email=${encodeURIComponent(
            email
        )}`
    );
}

export function joinWaitlist(email) {
    return request("/waitlist", {
        method: "POST",
        body: JSON.stringify({ email })
    });
}

export function getEvents() {
    return request("/events");
}
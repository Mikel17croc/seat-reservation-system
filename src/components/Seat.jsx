function Seat({
    seat,
    selected,
    onClick
}) {
    const isAvailable =
        seat.status === "AVAILABLE";

    return (
        <button
            className={`seat ${seat.status.toLowerCase()} ${selected ? "selected" : ""
                }`}
            disabled={!isAvailable}
            onClick={() => onClick(seat)}
        >
            <strong>{seat.seat_number}</strong>
            <span>{seat.status}</span>
        </button>
    );
}

export default Seat;
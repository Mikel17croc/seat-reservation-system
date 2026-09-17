import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import SeatMap from "./pages/SeatMap";
import MyReservations from "./pages/MyReservations";
import EventLog from "./pages/EventLog";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<SeatMap />}
        />

        <Route
          path="/reservations"
          element={
            <MyReservations />
          }
        />

        <Route
          path="/events"
          element={<EventLog />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
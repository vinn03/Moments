import React, { useState, useEffect } from "react";
import Map from "./Map/map";
import Table from "./Map/table";
import List from "./List/list";
import MemoCalendar from "./Calendar/calendar";
import { MemoController } from "../../controllers/memo.controller";
import Header from "../Header/header";
import { useFirebaseAuth } from "../../contexts/FirebaseAuth.context";

interface Location {
  coordinates: [number, number];
  memo: {
    description: string;
    title: string;
    date: string;
    location: string;
  }[];
}

const Lens: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [view, setView] = useState("map");
  const { currentUser } = useFirebaseAuth();

  const fetchData = async () => {
    try {
      const memos = await MemoController.get_all_memos(currentUser.uid);
      const reducedLocations: Location[] = [];
      for (const memo of memos) {
        const coordinates = memo.location.coordinates;

        const memo_location_obj = {
          title: memo.name,
          description: memo.description,
          date: memo.date,
          location: memo.location.name,
        };

        // Check if location already exists in fetchedLocations array
        const existingLocationIndex = reducedLocations.findIndex(
          (loc) => loc.coordinates[0] === coordinates[0] && loc.coordinates[1] === coordinates[1]
        );

        if (existingLocationIndex !== -1) {
          // Location already exists, add memo to its memo array
          reducedLocations[existingLocationIndex].memo.push(memo_location_obj);
        } else {
          // Location doesn't exist, create a new Location object
          reducedLocations.push({ coordinates: coordinates, memo: [memo_location_obj] });
        }
      }

      setLocations(reducedLocations);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return;
      }
      console.error("Server Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(locations);
  }, []);

  return (
    <div className="lens w-2/3 text-left m-auto mt-10 bg-blue-200 p-10 pr-20 pl-20 rounded-3xl border-2 border-blue-800">
      <Header />

      <div id="lens-header" className="flex flex-row justify-between">
        <h1 className="text-blue-800 text-3xl mb-4">Lens</h1>
        <div>
          <button
            onClick={() => setView("map")}
            className={`button-link text-blue-800 bg-blue-100 hover:bg-blue-300 border-blue-800 border-2 p-2 text-center rounded-lg w-24 ${
              view === "map" ? "bg-blue-300" : ""
            }`}
          >
            Map
          </button>
          <button
            onClick={() => setView("list")}
            className={`button-link text-blue-800 bg-blue-100 hover:bg-blue-300 border-blue-800 border-2 p-2 text-center rounded-lg w-24 ${
              view === "list" ? "bg-blue-300" : ""
            }`}
          >
            List
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`button-link text-blue-800 bg-blue-100 hover:bg-blue-300 border-blue-800 border-2 p-2 text-center rounded-lg w-24 ${
              view === "calendar" ? "bg-blue-300" : ""
            }`}
          >
            Calendar
          </button>
        </div>
      </div>

      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      {(() => {
        switch (view) {
          case "map":
            return (
              <>
                <Map locations={locations} view={"map"} />
                <Table locations={locations} />
              </>
            );
          case "list":
            return (
              <>
                <List locations={locations} />
              </>
            );
          case "calendar":
            return (
              <>
                <MemoCalendar locations={locations} />
              </>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default Lens;

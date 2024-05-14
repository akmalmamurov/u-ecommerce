import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  TypeSelector,
  FullscreenControl,
  GeolocationControl,
} from "@pbe/react-yandex-maps";

const API_KEY = "13cb04a7-d7dd-434b-b1e9-52c8e4965520";

const MapContainer = ({ setAddressData }) => {
  const ref = useRef();
  const ref2 = useRef();
  const ymaps = useRef(null);

  const [newCoords, setNewCoords] = useState("41.311081, 69.240562");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latitude, longitude] = newCoords.split(", ").map(parseFloat);
        const res = await axios.get(
          `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${longitude},${latitude}&format=json`
        );

        const data = res.data;
        const collection = data.response.GeoObjectCollection.featureMember.map(
          (item) => item.GeoObject
        );
        setAddressData(newCoords);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [newCoords, setAddressData]);

  const handleMapClick = async (event) => {
    try {
      const coords = event.get("coords");
      const [latitude, longitude] = coords.map((coord) => coord.toFixed(6));
      const formattedCoords = `${latitude}, ${longitude}`;
      setNewCoords(formattedCoords);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGeolocationSuccess = (event) => {
    const coords = event.get("position");
    const [latitude, longitude] = coords;
    const formattedCoords = `${latitude}, ${longitude}`;
    setNewCoords(formattedCoords);
  };

  // Handle SearchControl outside JSX
  let searchControl = null;
  try {
    searchControl = <SearchControl options={{ float: "right" }} />;
  } catch (error) {
    console.error("SearchControl error:", error);
  }

  return (
    <YMaps
      query={{
        load: "package.full",
        apikey: API_KEY,
      }}
    >
      <Map
        instanceRef={ref2}
        state={{
          center: [41.311081, 69.240562],
          zoom: 9,
          controls: ["zoomControl"],
        }}
        onLoad={(e) => {
          ymaps.current = e;
        }}
        width="100%"
        height="400px"
        modules={["control.ZoomControl"]}
        onClick={handleMapClick}
      >
        <GeolocationControl
          options={{ float: "left" }}
          onGeolocationSuccess={handleGeolocationSuccess}
        />
        <FullscreenControl />
        {searchControl}
        <TypeSelector options={{ float: "right" }} />
        <Placemark
          instanceRef={ref}
          geometry={newCoords.split(", ").map(parseFloat)}
          options={{
            iconImageSize: [30, 30],
            draggable: true,
            preset: "islands#greenIcon",
            hideIconOnBalloonOpen: false,
            openEmptyHint: true,
          }}
          properties={{
            hintContent: newCoords,
          }}
        />
      </Map>
    </YMaps>
  );
};

export default MapContainer;

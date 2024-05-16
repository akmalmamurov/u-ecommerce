/* eslint-disable react/prop-types */
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

const MapContainer = ({ setAddressData, setClStreet }) => {
  const ref = useRef();
  const ref2 = useRef();
  const ymaps = useRef(null);

  const [newCoords, setNewCoords] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [clientAdress, setClientAdress] = useState("");

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
        setClStreet(clientAdress);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [newCoords, setAddressData, clientAdress, setClStreet]);

  const handleMapClick = async (event) => {
    try {
      const coords = event.get("coords");
      const [latitude, longitude] = coords.map((coord) => coord.toFixed(6));
      const formattedCoords = `${latitude}, ${longitude}`;
      setNewCoords(formattedCoords);

      const res = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${longitude},${latitude}&format=json`
      );

      const data = res.data;
      const foundAddress =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
      setClientAdress(foundAddress);
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

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${searchValue}&format=json`
      );

      const data = res.data;
      const foundCoords =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
      const [latitude, longitude] = foundCoords.split(" ").map(parseFloat);
      const formattedCoords = `${latitude}, ${longitude}`;
      setNewCoords(formattedCoords);
    } catch (error) {
      console.error(error);
    }
  };

  let searchControl = null;
  try {
    searchControl = (
      <SearchControl
        options={{ float: "right" }}
        onSearchSubmit={handleSearch}
        onResultShow={(e) => {
          setSearchValue(e.originalEvent.target.value);
        }}
      />
    );
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
          zoom: 11,
          controls: ["zoomControl"],
        }}
        onLoad={(e) => {
          ymaps.current = e;
        }}
        width="100%"
        height="200px"
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
            iconImageSize: [10, 10],
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

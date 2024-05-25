import PropTypes from "prop-types";
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
  const mapRef = useRef(null);
  const placemarkRef = useRef(null);
  const ymaps = useRef(null);

  const [newCoords, setNewCoords] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!newCoords) return;

      try {
        const [latitude, longitude] = newCoords.split(", ").map(parseFloat);
        const res = await axios.get(
          `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${longitude},${latitude}&format=json`
        );

        const data = res.data;
        const foundAddress =
          data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
        setClientAddress(foundAddress);
        setAddressData(newCoords);
        setClStreet(foundAddress);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [newCoords, setAddressData, setClStreet]);

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
      setClientAddress(foundAddress);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGeolocationSuccess = async (event) => {
    const coords = event.get("position").coords;
    const [latitude, longitude] = [
      coords.latitude.toFixed(6),
      coords.longitude.toFixed(6),
    ];
    const formattedCoords = `${latitude}, ${longitude}`;
    setNewCoords(formattedCoords);

    try {
      const res = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${longitude},${latitude}&format=json`
      );
      const data = res.data;
      const foundAddress =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
      setClientAddress(foundAddress);
    } catch (err) {
      console.log(err);
    }
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

  const handlePlacemarkDragEnd = async (event) => {
    const coords = event.get("target").geometry.getCoordinates();
    const [latitude, longitude] = coords.map((coord) => coord.toFixed(6));
    const formattedCoords = `${latitude}, ${longitude}`;
    setNewCoords(formattedCoords);

    try {
      const res = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${longitude},${latitude}&format=json`
      );

      const data = res.data;
      const foundAddress =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.name;
      setClientAddress(foundAddress);
      setAddressData(formattedCoords);
      setClStreet(foundAddress);
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
    <YMaps query={{ apikey: API_KEY }}>
      <Map
        instanceRef={mapRef}
        state={{
          center: [41.311081, 69.240562],
          zoom: 11,
          controls: ["zoomControl"],
        }}
        width="100%"
        height="400px"
        modules={["control.ZoomControl", "control.GeolocationControl"]}
        onClick={handleMapClick}
        onLoad={(ymapInstanse) => (ymaps.current = ymapInstanse)}
      >
        <GeolocationControl
          options={{ float: "left" }}
          onClick={handleGeolocationSuccess}
        />
        <FullscreenControl />
        {searchControl}
        <TypeSelector options={{ float: "right" }} />
        <Placemark
          geometry={newCoords.split(", ").map(parseFloat)}
          options={{
            iconImageSize: [30, 42],
            draggable: true,
            preset: "islands#greenIcon",
          }}
          properties={{
            hintContent: clientAddress,
          }}
          onDragEnd={handlePlacemarkDragEnd}
        />
      </Map>
    </YMaps>
  );
};

MapContainer.propTypes = {
  setAddressData: PropTypes.func.isRequired,
  setClStreet: PropTypes.func.isRequired,
};

export default MapContainer;

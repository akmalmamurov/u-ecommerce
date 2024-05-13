/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  YMaps,
  Map,
  Placemark,
  SearchControl,
  TypeSelector,
} from "@pbe/react-yandex-maps";

const API_KEY = "13cb04a7-d7dd-434b-b1e9-52c8e4965520";

// eslint-disable-next-line react/prop-types
const MapContainer = ({ onSubmit }) => {
  const ref = useRef();
  const ref2 = useRef();
  const ymaps = useRef(null);

  const [latitude, setLatitude] = useState(41.311081);
  const [longitude, setLongitude] = useState(69.240562);

  const [newCoords, setNewCoords] = useState([latitude, longitude]);
  const [address, setAddress] = useState("");
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (latitude && longitude) {
          const res = await axios.get(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${longitude},${latitude}&format=json`
          );

          const data = res.data;
          const collection =
            data.response.GeoObjectCollection.featureMember.map(
              (item) => item.GeoObject
            );
          setOptions(collection);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [latitude, longitude]);
  const handleSubmit = ({ coords, address }) => {
    onSubmit({ coords, address });
  };
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
          const points = [
            [42.8746, 74.5698],
            [37.9886, 58.3796],
          ];
          const bounds = e.util.bounds.fromPoints(points);

          ref2.current.setBounds(bounds, { checkZoomRange: true });

          e.geocode(newCoords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const newAddress = [
              firstGeoObject.getLocalities().length
                ? firstGeoObject.getLocalities()
                : firstGeoObject.getAdministrativeAreas(),
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
              firstGeoObject.getPremiseNumber(),
            ]
              .filter(Boolean)
              .join(", ");

            setAddress(newAddress);
            setValue(newAddress);
          });
        }}
        width="100%"
        height="400px"
        modules={["control.ZoomControl"]}
        onClick={(event) => {
          const coords = event.get("coords");
          setNewCoords(coords);

          ymaps.current.geocode(coords).then((res) => {
            const firstGeoObject = res.geoObjects.get(0);
            const newAddress = [
              firstGeoObject.getLocalities().length
                ? firstGeoObject.getLocalities()
                : firstGeoObject.getAdministrativeAreas(),
              firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
              firstGeoObject.getPremiseNumber(),
            ]
              .filter(Boolean)
              .join(", ");
            ref.current.getMap().hint.open(coords, newAddress);
            setAddress(newAddress);
            setValue(newAddress);
          });
        }}
      >
        <SearchControl options={{ float: "right" }} />
        <TypeSelector options={{ float: "right" }} />
        <Placemark
          instanceRef={ref}
          onDragEnd={(event) => {
            const coords = ref.current.geometry._coordinates;
            setNewCoords(coords);
            ymaps.current.geocode(coords).then((res) => {
              const firstGeoObject = res.geoObjects.get(0);
              const newAddress = [
                firstGeoObject.getLocalities().length
                  ? firstGeoObject.getLocalities()
                  : firstGeoObject.getAdministrativeAreas(),
                firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
                firstGeoObject.getPremiseNumber(),
              ]
                .filter(Boolean)
                .join(", ");
              ref.current.getMap().hint.open(coords, newAddress);
              setAddress(newAddress);
              setValue(newAddress);
            });
          }}
          onClick={() => {
            alert("Вы нажали метку");
          }}
          geometry={newCoords}
          options={{
            iconImageSize: [30, 30],
            draggable: true,
            preset: "islands#greenIcon",
            hideIconOnBalloonOpen: false,
            openEmptyHint: true,
          }}
          properties={{
            iconContent: "+",
            hintContent: address,
          }}
        />
      </Map>
    </YMaps>
  );
};

export default MapContainer;

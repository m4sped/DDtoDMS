import React, { useState, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const DDToDMSCalculator: React.FC = () => {
  const [latitudeDD, setLatitudeDD] = useState<string>("");
  const [longitudeDD, setLongitudeDD] = useState<string>("");
  const [resultLatDMS, setResultLatDMS] = useState<string>("");
  const [resultLngDMS, setResultLngDMS] = useState<string>("");
  const [selectedIcon, setSelectedIcon] = useState<string>("default");

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const iconOptions: Record<string, string> = {
    default: "https://picsum.photos/40/40",
    red: "https://icons.iconarchive.com/icons/mattahan/ultrabuuf/256/Comics-Ironman-Red-icon.png",
    green: "https://icons.iconarchive.com/icons/3xhumed/mega-games-pack-22/256/The-Incredible-Hulk-2-icon.png",
    blue: "https://icons.iconarchive.com/icons/mattahan/ultrabuuf/256/Comics-Captain-America-icon.png",
    yellow: "https://icons.iconarchive.com/icons/mattahan/ultrabuuf/256/Comics-Ironman-Red-icon.png",
  };

  const convertDDToDMS = (dd: number): string => {
    const degrees = Math.floor(dd);
    const minutesFloat = Math.abs((dd - degrees) * 60);
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60);

    return `${Math.abs(degrees)}° ${minutes}' ${seconds}"`;
  };

  const handleConversion = () => {
    if (
      latitudeDD !== "" &&
      longitudeDD !== "" &&
      !isNaN(Number(latitudeDD)) &&
      !isNaN(Number(longitudeDD))
    ) {
      const latDMS = convertDDToDMS(parseFloat(latitudeDD));
      const lngDMS = convertDDToDMS(parseFloat(longitudeDD));

      setResultLatDMS(latDMS);
      setResultLngDMS(lngDMS);

      if (mapInstance.current) {
        mapInstance.current.setCenter([
          parseFloat(longitudeDD),
          parseFloat(latitudeDD),
        ]);
        mapInstance.current.setZoom(14); // Zoom lebih dekat ke lokasi
      }
    } else {
      alert("Masukkan koordinat Decimal Degrees yang valid.");
    }
  };

  const handleAddPoint = () => {
    if (
      latitudeDD !== "" &&
      longitudeDD !== "" &&
      !isNaN(Number(latitudeDD)) &&
      !isNaN(Number(longitudeDD))
    ) {
      const coordinates: [number, number] = [
        parseFloat(longitudeDD),
        parseFloat(latitudeDD),
      ];

      if (mapInstance.current) {
        const markerEl = document.createElement("div");
        markerEl.className = "marker";
        markerEl.style.backgroundImage = `url(${iconOptions[selectedIcon]})`;
        markerEl.style.backgroundSize = "cover";
        markerEl.style.width = "40px";
        markerEl.style.height = "40px";
        markerEl.style.borderRadius = "50%";

        const newMarker = new maplibregl.Marker({ element: markerEl })
          .setLngLat(coordinates)
          .addTo(mapInstance.current);

        markersRef.current.push(newMarker);
      }
    } else {
      alert("Masukkan koordinat Decimal Degrees yang valid.");
    }
  };

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = new maplibregl.Map({
        container: mapContainer.current,
        style:
          "https://api.maptiler.com/maps/dataviz-dark/style.json?key=NU4TnQJY51sPc4xBLKl3",
        center: [0, 0],
        zoom: 1,
      });

      mapInstance.current.addControl(
        new maplibregl.NavigationControl({ visualizePitch: true })
      );
    }
  }, []);

  return (
    <div className="w-screen h-screen flex">
      {/* Bagian Kalkulator */}
      <div className="w-full md:w-1/3 h-full bg-gray-900 p-6 text-white overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Konversi DD ke DMS
        </h2>
        <p className="mb-6 text-center text-gray-300 text-sm">
          Masukkan koordinat dalam Decimal Degrees (DD) untuk dikonversi ke DMS.
        </p>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Lintang (DD)</label>
            <input
              type="number"
              placeholder="Lintang (DD)"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white text-sm"
              value={latitudeDD}
              onChange={(e) => setLatitudeDD(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bujur (DD)</label>
            <input
              type="number"
              placeholder="Bujur (DD)"
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white text-sm"
              value={longitudeDD}
              onChange={(e) => setLongitudeDD(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Pilih Ikon Marker</label>
            <select
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white text-sm"
              value={selectedIcon}
              onChange={(e) => setSelectedIcon(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="red">Merah</option>
              <option value="green">Hijau</option>
              <option value="blue">Biru</option>
            </select>
          </div>
          <button
            className="w-full bg-blue-600 py-3 rounded font-bold uppercase text-sm hover:bg-blue-700"
            onClick={handleConversion}
          >
            Konversi
          </button>
          <button
            className="w-full bg-green-600 py-3 rounded font-bold uppercase text-sm hover:bg-green-700"
            onClick={handleAddPoint}
          >
            Tambahkan Point
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium">Hasil:</h3>
          <div className="mt-3">
            <label className="block text-sm text-gray-300">Lat (DMS):</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-800 text-blue-400 border-none rounded text-sm"
              value={resultLatDMS}
              readOnly
            />
          </div>
          <div className="mt-3">
            <label className="block text-sm text-gray-300">Lng (DMS):</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-800 text-blue-400 border-none rounded text-sm"
              value={resultLngDMS}
              readOnly
            />
          </div>
        </div>
      </div>
      {/* Bagian Peta */}
      <div className="w-full md:w-2/3 h-full" ref={mapContainer}></div>
    </div>
  );
};

export default DDToDMSCalculator;

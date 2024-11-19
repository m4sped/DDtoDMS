import React, { useState } from 'react';

const DDToDMSCalculator: React.FC = () => {
  const [latitudeDD, setLatitudeDD] = useState<string>('');
  const [longitudeDD, setLongitudeDD] = useState<string>('');
  const [resultLatDMS, setResultLatDMS] = useState<string>('');
  const [resultLngDMS, setResultLngDMS] = useState<string>('');

  const convertDDToDMS = (dd: number): string => {
    const degrees = Math.floor(dd);
    const minutesFloat = Math.abs((dd - degrees) * 60);
    const minutes = Math.floor(minutesFloat);
    const seconds = Math.round((minutesFloat - minutes) * 60);

    return `${Math.abs(degrees)}° ${minutes}' ${seconds}"`;
  };

  const handleConversion = () => {
    if (latitudeDD !== '' && longitudeDD !== '' && !isNaN(Number(latitudeDD)) && !isNaN(Number(longitudeDD))) {
      const latDMS = convertDDToDMS(parseFloat(latitudeDD));
      const lngDMS = convertDDToDMS(parseFloat(longitudeDD));

      setResultLatDMS(latDMS);
      setResultLngDMS(lngDMS);
    } else {
      alert('Masukkan koordinat Decimal Degrees yang valid.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-gray-900 text-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-3 text-center">Konversi DD ke DMS</h2>
      <p className="mb-4 text-center text-gray-300 text-sm">
        Masukkan koordinat dalam Decimal Degrees (DD) untuk dikonversi ke DMS.
      </p>
      <div className="flex flex-col gap-4 mb-4">
        <div>
          <h3 className="text-md font-medium mb-2 text-center">Lintang (DD)</h3>
          <input
            type="number"
            placeholder="Lintang (DD)"
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
            value={latitudeDD}
            onChange={(e) => setLatitudeDD(e.target.value)}
          />
        </div>
        <div>
          <h3 className="text-md font-medium mb-2 text-center">Bujur (DD)</h3>
          <input
            type="number"
            placeholder="Bujur (DD)"
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
            value={longitudeDD}
            onChange={(e) => setLongitudeDD(e.target.value)}
          />
        </div>
      </div>
      <button
        className="w-full bg-blue-600 text-black py-2 rounded font-bold uppercase hover:bg-blue-700 transition duration-300 text-sm"
        onClick={handleConversion}
      >
        Konversi
      </button>
      <div className="mt-4 text-center">
        <h3 className="text-md font-medium mb-2">Hasil:</h3>
        <div className="mb-2">
          <label className="block text-gray-300 text-sm">Lat (DMS):</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-800 text-blue-400 border-none rounded text-center text-sm"
            value={resultLatDMS}
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm">Lng (DMS):</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-800 text-blue-400 border-none rounded text-center text-sm"
            value={resultLngDMS}
            readOnly
          />
        </div>
        <p className="text-center text-gray-300 text-sm mt-4">
          Note: Konversi dari DD (Decimal Degrees) ke DMS (Degrees Minutes Seconds)
        </p>
      </div> 
    </div>
  );
};

export default DDToDMSCalculator;

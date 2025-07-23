import { QRCodeCanvas } from 'qrcode.react';
import { useRef, useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const inputText = useRef();
  const refqur = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setText(inputText.current.value);
    inputText.current.value = '';
  };

  const handledownload = () => {
  const canvas = refqur.current.querySelector("canvas");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  // Create a temporary white background
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = width;
  tempCanvas.height = height;
  const tempContext = tempCanvas.getContext("2d");

  // Fill with white background
  tempContext.fillStyle = "#ffffff";
  tempContext.fillRect(0, 0, width, height);

  // Draw original QR code over it
  tempContext.drawImage(canvas, 0, 0);

  // Convert to image and download
  const url = tempCanvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = "qr-code.png";
  a.click();
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2f3] to-[#8e9eab] flex flex-col items-center justify-start px-4 py-10 font-sans">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md transition-all duration-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 mb-6 tracking-wide">
        QR Code Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <label htmlFor="text" className="block text-gray-700 font-semibold text-base sm:text-lg">
            Enter URL
          </label>
          <input
            type="text"
            ref={inputText}
            id="text"
            placeholder="https://example.com"
            className="w-full px-4 py-2 sm:px-5 sm:py-3 border-2 border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 shadow-inner"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg hover:opacity-90 hover:scale-105 transform transition-all duration-300 shadow-md"
          >
            🚀 Generate QR Code
          </button>
        </form>
      </div>

      {text && (
        <div
          className="mt-8 sm:mt-12 bg-white shadow-2xl p-6 sm:p-8 rounded-2xl flex flex-col items-center space-y-3 sm:space-y-4 w-full max-w-sm"
        >
        <div ref={refqur}>
          <QRCodeCanvas
            value={text}
            size={150}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          /></div>
          <p className="text-center text-gray-600 text-sm sm:text-base">
            📱 Scan using QR scanner or Google Lens
          </p>
          <button
            onClick={handledownload}
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2 rounded-full font-medium hover:scale-105 hover:opacity-90 transform transition-all duration-300 shadow-lg text-sm sm:text-base"
          >
            ⬇️ Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

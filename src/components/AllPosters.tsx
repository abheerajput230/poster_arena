"use client";

import { useState, useEffect, useRef } from "react";

const BASE_WALL_WIDTH = 1300;
const BASE_WALL_HEIGHT = 900;

const BASE_POSTER_WIDTH = 100;
const BASE_POSTER_HEIGHT = 120;
const GAP = 6;

export default function PosterWallPreview() {

  const wallRef = useRef(null);

  const [wall, setWall] = useState([]);
  const [scale, setScale] = useState(1);

  const [userImages, setUserImages] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [downloadError, setDownloadError] = useState("");

  const WALL_WIDTH = BASE_WALL_WIDTH * scale;
  const WALL_HEIGHT = BASE_WALL_HEIGHT * scale;

  const POSTER_WIDTH = BASE_POSTER_WIDTH * scale;
  const POSTER_HEIGHT = BASE_POSTER_HEIGHT * scale;
  const SCALED_GAP = GAP * scale;


  // responsive scale
  useEffect(() => {

    function updateScale() {

      const screenWidth = window.innerWidth;

      if (screenWidth < 480) {
        setScale(screenWidth / 1100);
      } else if (screenWidth < 768) {
        setScale(screenWidth / 1200);
      } else {
        setScale(1);
      }

    }

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);

  }, []);


  // ✅ PROFESSIONAL HANDLE UPLOAD
  function handleUpload(e) {

    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    const allowedExtensions = [
      ".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp",
      ".svg", ".avif", ".heic", ".heif",
      ".tif", ".tiff", ".jfif", ".ico", ".apng"
    ];

    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {

      // check MIME type first (best method)
      if (file.type.startsWith("image/")) {
        validFiles.push(file);
        return;
      }

      // fallback extension check
      const name = file.name.toLowerCase();

      const isValidExtension =
        allowedExtensions.some(ext => name.endsWith(ext));

      if (isValidExtension) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }

    });

    if (validFiles.length === 0) {
      setUploadError("Please upload valid image files only.");
      return;
    }

    if (invalidFiles.length > 0) {
      setUploadError(
        `Some files were skipped: ${invalidFiles.join(", ")}`
      );
    } else {
      setUploadError("");
    }

    // clean old URLs to prevent memory leak
    userImages.forEach(url => URL.revokeObjectURL(url));

    const urls = validFiles.map(file =>
      URL.createObjectURL(file)
    );

    setUserImages(urls);

  }


  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }


  function generatePattern() {
    // Keep total posters between 30 and 40.
    const rows = 5;
    const pattern = [];
    let total = 0;

    for (let i = 0; i < rows; i++) {
      const remainingRows = rows - i;
      const minRemaining = (remainingRows - 1) * 6;
      const maxForRow = Math.min(8, 40 - total - minRemaining);
      const minForRow = Math.max(6, 30 - total - (remainingRows - 1) * 8);

      const count =
        Math.floor(Math.random() * (maxForRow - minForRow + 1)) + minForRow;

      pattern.push(count);
      total += count;
    }

    return pattern;

  }


  function generateWall() {

    if (userImages.length === 0) return;

    const pattern = generatePattern();

    const total = pattern.reduce((a, b) => a + b, 0);

    // If uploaded images are fewer than needed, repeat shuffled images.
    const images = [];
    while (images.length < total) {
      images.push(...shuffle(userImages));
    }
    images.length = total;

    let imageIndex = 0;

    const positions = [];

    const totalHeight =
      pattern.length * POSTER_HEIGHT +
      (pattern.length - 1) * SCALED_GAP;

    let startY = (WALL_HEIGHT - totalHeight) / 2;

    pattern.forEach((count) => {

      const rowWidth =
        count * POSTER_WIDTH +
        (count - 1) * SCALED_GAP;

      const startX =
        (WALL_WIDTH - rowWidth) / 2;

      for (let i = 0; i < count; i++) {

        if (!images[imageIndex]) break;

        positions.push({

          image: images[imageIndex++],

          x: startX + i * (POSTER_WIDTH + SCALED_GAP),

          y: startY,

        });

      }

      startY += POSTER_HEIGHT + SCALED_GAP;

    });

    setWall(positions);

  }


  useEffect(() => {

    if (userImages.length > 0) {
      generateWall();
    }

  }, [scale, userImages]);


  // download wall
  async function downloadWall() {

    if (wall.length === 0) {
      setDownloadError("Generate wall first, then download.");
      return;
    }

    try {
      setDownloadError("");
      const exportScale = Math.max(1920 / WALL_WIDTH, 1080 / WALL_HEIGHT, 1);
      const exportWidth = Math.round(WALL_WIDTH * exportScale);
      const exportHeight = Math.round(WALL_HEIGHT * exportScale);

      const canvas = document.createElement("canvas");
      canvas.width = exportWidth;
      canvas.height = exportHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas not available");

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const loadImage = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error("Failed to load image"));
          img.src = src;
        });

      let loadedCount = 0;
      await Promise.all(
        wall.map(async (poster) => {
          try {
            const img = await loadImage(poster.image);
            const drawX = (poster.x - POSTER_WIDTH / 2) * exportScale;
            const drawY = (poster.y - POSTER_HEIGHT / 2) * exportScale;
            const drawW = POSTER_WIDTH * exportScale;
            const drawH = POSTER_HEIGHT * exportScale;
            ctx.drawImage(img, drawX, drawY, drawW, drawH);
            loadedCount += 1;
          } catch {
            // Skip broken/unsupported images but keep generating output.
          }
        })
      );

      if (loadedCount === 0) {
        throw new Error("No images were drawable");
      }

      const link = document.createElement("a");
      link.download = "poster-wall.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      setDownloadError("Download failed. Some formats may not be browser-supported.");
    }

  }


  return (

    <div className="min-h-screen bg-gray-300 flex flex-col items-center p-4">

      {/* Upload */}
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="mb-4"
      />

      {uploadError && (
        <p className="mb-3 text-sm text-red-600">
          {uploadError}
        </p>
      )}


      {/* Buttons */}
      <div className="flex gap-3 mb-4">

        <button
          onClick={generateWall}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Generate Wall
        </button>

        <button
          onClick={downloadWall}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Download Wall
        </button>

      </div>
      {downloadError && (
        <p className="mb-3 text-sm text-red-600">{downloadError}</p>
      )}


      {/* Wall */}
      <div
        ref={wallRef}
        className="relative bg-white shadow-2xl rounded-xl"
        style={{
          width: WALL_WIDTH,
          height: WALL_HEIGHT,
          maxWidth: "95vw",
        }}
      >

        {wall.map((poster, index) => (

         <div
  key={index}
  className="absolute shadow-lg rounded overflow-hidden"
  style={{
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    left: poster.x,
    top: poster.y,
    transform: "translate(-50%, -50%)",
  }}
>


            <img
              src={poster.image}
              className="w-full h-full object-cover"
            />

          </div>

        ))}

      </div>

    </div>

  );

}

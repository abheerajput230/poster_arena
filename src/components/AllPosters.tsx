"use client";
import { useState, useEffect } from "react";

const posterImages = [
  'https://i.pinimg.com/736x/e7/0f/35/e70f35bfac95e8a099bddaca3e28b323.jpg',
  'https://i.pinimg.com/736x/53/aa/e2/53aae2d75c78004c1cf5b5abfb10d520.jpg',
  'https://i.pinimg.com/736x/f9/22/92/f92292a99ff0041db6b2eb57a99b968f.jpg',
  'https://i.pinimg.com/736x/94/ce/34/94ce348650daff6bb614b74e1f5d8180.jpg',
  'https://i.pinimg.com/736x/ab/81/c5/ab81c56cbefcaee7375b0b29d904525e.jpg',
  'https://i.pinimg.com/736x/06/a9/ea/06a9ea9d3132cc9eec13517bf6218b9a.jpg',
  'https://i.pinimg.com/736x/eb/17/6a/eb176a5e9ec6b349694f902fe439bf27.jpg',
  'https://i.pinimg.com/736x/43/27/71/43277147e35e0e1f0e612b9b508c8bbf.jpg',
  'https://i.pinimg.com/736x/d2/22/ab/d222ab9820dd0c9f2f3535abe553340a.jpg',
  'https://i.pinimg.com/736x/0b/8d/db/0b8ddb59302b148ba5527df1c1f3b7b2.jpg',
  "https://i.pinimg.com/736x/92/bc/e2/92bce21eff3c8ab7b09ebc09cbae2eb7.jpg",
  "https://i.pinimg.com/474x/f8/23/a6/f823a6d9f56a0ce6bf76d16b7f033e9d.jpg",
  "https://i.pinimg.com/474x/fb/b5/57/fbb557b3a5f1e68123999e683cb0ae39.jpg",
  "https://i.pinimg.com/736x/c2/03/39/c20339c8c4c7263b084832866b7234a9.jpg",
  "https://i.pinimg.com/1200x/1b/84/5a/1b845a4f6bc04926eb1a75c9158a8393.jpg",
  "https://i.pinimg.com/736x/7a/f9/2a/7af92ae8266b82fa2f05997987d20d3d.jpg",
  "https://i.pinimg.com/736x/e6/07/52/e6075284814076420dad758efd6b7e60.jpg",
  "https://i.pinimg.com/736x/e0/7a/1e/e07a1eba2881e7af66ed386272860bd3.jpg",
  "https://i.pinimg.com/1200x/a3/01/4c/a3014cebd3a80ee2fb897b688b4bdd5d.jpg",
  "https://i.pinimg.com/736x/ad/e7/c9/ade7c9a1dd0a263f26c3d0d07f7acad5.jpg",
  "https://i.pinimg.com/736x/f7/b8/dd/f7b8dd10686c19ab430ae4bdf5e54135.jpg",
"https://i.pinimg.com/1200x/1a/b4/64/1ab464755279e6e54374c1b18edcfb05.jpg"


];

const BASE_WALL_WIDTH = 1000;
const BASE_WALL_HEIGHT = 700;

const BASE_POSTER_WIDTH = 100;
const BASE_POSTER_HEIGHT = 120;
const GAP = 6;

export default function PosterWallPreview() {

  const [wall, setWall] = useState([]);
  const [scale, setScale] = useState(1);

  const WALL_WIDTH = BASE_WALL_WIDTH * scale;
  const WALL_HEIGHT = BASE_WALL_HEIGHT * scale;

  const POSTER_WIDTH = BASE_POSTER_WIDTH * scale;
  const POSTER_HEIGHT = BASE_POSTER_HEIGHT * scale;
  const SCALED_GAP = GAP * scale;


  // detect screen size and scale
  useEffect(() => {

    function updateScale() {

      const screenWidth = window.innerWidth;

      if (screenWidth < 480) {
        setScale(screenWidth / 1100); // xs screen
      } else if (screenWidth < 768) {
        setScale(screenWidth / 1200); // small screen
      } else {
        setScale(1); // desktop
      }

    }

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);

  }, []);


  function shuffle(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  function generatePattern() {

    const rows = Math.floor(Math.random() * 2) + 4;

    const pattern = [];

    for (let i = 0; i < rows; i++) {
      pattern.push(Math.floor(Math.random() * 3) + 3);
    }

    return pattern;

  }


  function generateWall() {

    const pattern = generatePattern();

    const total = pattern.reduce((a, b) => a + b, 0);

    const images = shuffle(posterImages).slice(0, total);

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
    generateWall();
  }, [scale]);


  return (

    <div className="min-h-screen bg-gray-300 flex flex-col items-center p-4 xs:p-2">

      <button
        onClick={generateWall}
        className="mb-4 px-4 py-2 bg-black text-white rounded-lg xs:text-sm"
      >
        Refresh Layout
      </button>


      <div
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
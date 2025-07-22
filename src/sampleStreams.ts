import { FileCollection } from "@vizhub/viz-types";

type SampleStream = {
  chunks: string[];
  expectedFiles: FileCollection;
};

export const sampleStreams: Array<SampleStream> = [
  {
    chunks: [
      "**",
      "styles.css**\n\n```css\nbody {\n  font-family:",
      " 'Arial', sans-serif; /* Specified font */\n  background-color",
      ": #000;\n  color: #eee;\n  margin: 0;\n  overflow: hidden;\n  display: flex;",
      "\n  flex-direction: column;\n  min-height: 100vh;\n  background-image: radial-gradient(circle at",
      " center, #111 0%, #000 100%); /* subtle gradient for depth */\n}\n\nheader, main, footer {\n  padding: 1rem;\n}\n\nheader {\n  ",
      "background-color: #2980B9;\n  color: white;\n  text-align: center;\n  box-shadow: 0px 2px 5px rgba(0, 0,",
      " 0, 0.3); /* Added shadow for depth */\n}\n\nh1 {\n  margin: 0;\n  font-size: 2em; /* Increased size slightly */\n  text-shadow: 2px 2px 4px rgba(0, 0,",
      " 0, 0.5); /* Added shadow to text */\n}\n\nmain {\n  flex: 1;\n  position: relative;\n  overflow: hidden; /* Makes sure no stars overflow */\n}\n\nfooter {\n  background-color: #C0392B;",
      "\n  color: white;\n  text-align: center;\n  margin-top: auto;\n  border-top: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border */\n}\n\n.star {\n",
      "  position: absolute;\n  transform: translate(-50%, -50%);\n  border-radius: 50%; /* Makes star round */\n  animation: twinkle 1s infinite;\n  box-shadow: 0 0 1px rgba(255,25",
      "5,255,0.5); /* subtle glow */\n}\n\n/* Removed inline color assignments to improve maintainability */\n.star.blue, .star.pink, .star.yellow, .star.green, .star.purple, .star.orange, .star.cyan {\n\n",
      "}\n\n\n@keyframes twinkle {\n  0% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); } /* Added scaling effect */\n  50% { opacity: 1; transform: translate(-50%, -50%) scale(1",
      ".2); } /* Added scaling effect */\n  100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); } /* Added scaling effect */\n}\n```\n\n**script.js**\n\n```javascript\nconst numStars = 1",
      "000; // Increased number of stars\nconst starfield = document.getElementById('starfield');\nconst colors = ['blue', 'pink', 'yellow', 'green', 'purple', 'orange', 'cyan'];\n\nfunction createStar() {\n  const star = document.createElement('div');\n",
      "  star.className = 'star';\n  const size = Math.random() * 2 + 1; // Slightly smaller stars\n  star.style.width = `${size}px`;\n  star.style.height = `${size}px`;\n  star.style.left = `${Math",
      ".random() * 100}%`;\n  star.style.top = `${Math.random() * 100}%`;\n  star.style.animationDuration = `${Math.random() * 10 + 5}s`;\n  star.style.animationDelay = `${",
      "Math.random() * 5}s`; // Add a random delay to stagger twinkling\n  star.classList.add(colors[Math.floor(Math.random() * colors.length)]);\n  return star;\n}\n\nfor (let i = 0; i < numStars; i++)",
      ' {\n    starfield.appendChild(createStar());\n}\n\n```\n\n**index.html**\n\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Star Aura</title>\n  <link rel="stylesheet" href="styles.css">\n</head',
      '>\n<body>\n  <header>\n    <h1>Star Aura</h1>\n  </header>\n  <main id="starfield"></main>\n  <footer>\n    <p>&copy; 2023 My Website</p>\n  </footer>\n  <script src',
      '="script.js"></script>\n</body>\n</html>\n```\n',
    ],
    expectedFiles: {
      "styles.css":
        "body {\n  font-family: 'Arial', sans-serif; /* Specified font */\n  background-color: #000;\n  color: #eee;\n  margin: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background-image: radial-gradient(circle at center, #111 0%, #000 100%); /* subtle gradient for depth */\n}\n\nheader, main, footer {\n  padding: 1rem;\n}\n\nheader {\n  background-color: #2980B9;\n  color: white;\n  text-align: center;\n  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3); /* Added shadow for depth */\n}\n\nh1 {\n  margin: 0;\n  font-size: 2em; /* Increased size slightly */\n  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Added shadow to text */\n}\n\nmain {\n  flex: 1;\n  position: relative;\n  overflow: hidden; /* Makes sure no stars overflow */\n}\n\nfooter {\n  background-color: #C0392B;\n  color: white;\n  text-align: center;\n  margin-top: auto;\n  border-top: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border */\n}\n\n.star {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  border-radius: 50%; /* Makes star round */\n  animation: twinkle 1s infinite;\n  box-shadow: 0 0 1px rgba(255,255,255,0.5); /* subtle glow */\n}\n\n/* Removed inline color assignments to improve maintainability */\n.star.blue, .star.pink, .star.yellow, .star.green, .star.purple, .star.orange, .star.cyan {\n\n}\n\n\n@keyframes twinkle {\n  0% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); } /* Added scaling effect */\n  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); } /* Added scaling effect */\n  100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); } /* Added scaling effect */\n}",
      "script.js":
        "const numStars = 1000; // Increased number of stars\nconst starfield = document.getElementById('starfield');\nconst colors = ['blue', 'pink', 'yellow', 'green', 'purple', 'orange', 'cyan'];\n\nfunction createStar() {\n  const star = document.createElement('div');\n  star.className = 'star';\n  const size = Math.random() * 2 + 1; // Slightly smaller stars\n  star.style.width = `${size}px`;\n  star.style.height = `${size}px`;\n  star.style.left = `${Math.random() * 100}%`;\n  star.style.top = `${Math.random() * 100}%`;\n  star.style.animationDuration = `${Math.random() * 10 + 5}s`;\n  star.style.animationDelay = `${Math.random() * 5}s`; // Add a random delay to stagger twinkling\n  star.classList.add(colors[Math.floor(Math.random() * colors.length)]);\n  return star;\n}\n\nfor (let i = 0; i < numStars; i++) {\n    starfield.appendChild(createStar());\n}\n",
      "index.html":
        '<!DOCTYPE html>\n<html>\n<head>\n  <title>Star Aura</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <header>\n    <h1>Star Aura</h1>\n  </header>\n  <main id="starfield"></main>\n  <footer>\n    <p>&copy; 2023 My Website</p>\n  </footer>\n  <script src="script.js"></script>\n</body>\n</html>',
    },
  },
  {
    chunks: [
      "**",
      "script.js**\n\n```javascript\nconst numStars = 100",
      "0;\nconst starfield = document.getElementById('starfield');\nconst",
      " colors = ['blue', 'pink', 'yellow', 'green', 'purple', 'orange', 'cyan'];\n\nconst createStar = () => {\n",
      "  const size = Math.random() * 2 + 1;\n  const color = colors[Math.floor(Math.random() * colors",
      '.length)];\n  const duration = Math.random() * 10 + 5;\n  const delay = Math.random() * 5;\n\n  return `<div class="star ${color}" style="width:${',
      "size}px; height:${size}px; left:${Math.random() * 100}%; top:${Math.random() * 100}%; animation-duration:${duration}s; animation-delay:${",
      "delay}s;\"></div>`;\n};\n\nstarfield.innerHTML = Array.from({ length: numStars }, createStar).join('');\n```\n\n**styles.css**\n\n```css\nbody {\n  font-family: 'Arial', sans-serif;\n  background-color: #00",
      "0;\n  color: #eee;\n  margin: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background-image: radial-gradient(circle at center, #1",
      "11 0%, #000 100%);\n}\n\nheader, main, footer {\n  padding: 1rem;\n}\n\nheader {\n  background-color: #2980B9;\n  color: white;\n  text-align: center;",
      "\n  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);\n}\n\nh1 {\n  margin: 0;\n  font-size: 2em;\n  text-shadow: 2px 2",
      "px 4px rgba(0, 0, 0, 0.5);\n}\n\nmain {\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n}\n\nfooter {\n  background-color: #C0392B;\n  ",
      "color: white;\n  text-align: center;\n  margin-top: auto;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n.star {\n  position: absolute;\n",
      "  transform: translate(-50%, -50%);\n  border-radius: 50%;\n  animation: twinkle 1s infinite;\n  box-shadow: 0 0 1px rgba(255,255,255,0.5);\n",
      "}\n\n@keyframes twinkle {\n  0% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }\n  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }\n",
      "  100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }\n}\n```\n\n",
    ],
    expectedFiles: {
      "script.js":
        "const numStars = 1000;\nconst starfield = document.getElementById('starfield');\nconst colors = ['blue', 'pink', 'yellow', 'green', 'purple', 'orange', 'cyan'];\n\nconst createStar = () => {\n  const size = Math.random() * 2 + 1;\n  const color = colors[Math.floor(Math.random() * colors.length)];\n  const duration = Math.random() * 10 + 5;\n  const delay = Math.random() * 5;\n\n  return `<div class=\"star ${color}\" style=\"width:${size}px; height:${size}px; left:${Math.random() * 100}%; top:${Math.random() * 100}%; animation-duration:${duration}s; animation-delay:${delay}s;\"></div>`;\n};\n\nstarfield.innerHTML = Array.from({ length: numStars }, createStar).join('');",
      "styles.css":
        "body {\n  font-family: 'Arial', sans-serif;\n  background-color: #000;\n  color: #eee;\n  margin: 0;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  background-image: radial-gradient(circle at center, #111 0%, #000 100%);\n}\n\nheader, main, footer {\n  padding: 1rem;\n}\n\nheader {\n  background-color: #2980B9;\n  color: white;\n  text-align: center;\n  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);\n}\n\nh1 {\n  margin: 0;\n  font-size: 2em;\n  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);\n}\n\nmain {\n  flex: 1;\n  position: relative;\n  overflow: hidden;\n}\n\nfooter {\n  background-color: #C0392B;\n  color: white;\n  text-align: center;\n  margin-top: auto;\n  border-top: 1px solid rgba(255, 255, 255, 0.1);\n}\n\n.star {\n  position: absolute;\n  transform: translate(-50%, -50%);\n  border-radius: 50%;\n  animation: twinkle 1s infinite;\n  box-shadow: 0 0 1px rgba(255,255,255,0.5);\n}\n\n@keyframes twinkle {\n  0% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }\n  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }\n  100% { opacity: 0.2; transform: translate(-50%, -50%) scale(1); }\n}",
    },
  },
];

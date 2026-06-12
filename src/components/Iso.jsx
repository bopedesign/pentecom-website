import React from 'react';

const COS30 = 0.8660254;
const SIN30 = 0.5;

export const iso = (x, y, z) => [(x - y) * COS30, (x + y) * SIN30 - z];

const join = (pts) => pts.map(p => p.join(",")).join(" ");

export const IsoCube = ({ x = 0, y = 0, z = 0, size = 1, palette = "blue", glow = true, opacity = 1 }) => {
  const s = size;
  const c000 = iso(x,     y,     z    );
  const c100 = iso(x + s, y,     z    );
  const c010 = iso(x,     y + s, z    );
  const c110 = iso(x + s, y + s, z    );
  const c001 = iso(x,     y,     z + s);
  const c101 = iso(x + s, y,     z + s);
  const c011 = iso(x,     y + s, z + s);
  const c111 = iso(x + s, y + s, z + s);

  const top   = [c001, c101, c111, c011];
  const left  = [c010, c110, c111, c011];
  const right = [c100, c110, c111, c101];

  const palettes = {
    blue:    { top: "#3a5fbd", left: "#2f4d9e", right: "#203263" },
    red:     { top: "#e6c999", left: "#e6c999", right: "#b89968" },
    yellow:  { top: "#d8a93a", left: "#ad7d12", right: "#7e5a0a" },
    brown:   { top: "#9b7350", left: "#6e4a2c", right: "#4b321e" },
    light:   { top: "#ffffff", left: "#dcdcdc", right: "#b5b5b5" },
    outline: { top: "transparent", left: "transparent", right: "transparent" },
  };
  const p = palettes[palette] || palettes.blue;
  const outline = palette === "outline";

  return (
    <g opacity={opacity}>
      {glow && !outline && (
        <g style={{ filter: "blur(14px)", opacity: 0.55 }}>
          <polygon points={join(top)}   fill={p.top} />
          <polygon points={join(left)}  fill={p.left} />
          <polygon points={join(right)} fill={p.right} />
        </g>
      )}
      <polygon points={join(top)}   fill={p.top}   stroke={outline ? "rgba(255,255,255,0.4)" : "none"} strokeWidth="0.012" />
      <polygon points={join(left)}  fill={p.left}  stroke={outline ? "rgba(255,255,255,0.4)" : "none"} strokeWidth="0.012" />
      <polygon points={join(right)} fill={p.right} stroke={outline ? "rgba(255,255,255,0.4)" : "none"} strokeWidth="0.012" />
    </g>
  );
};

export const IsoStage = ({ children, dotted = false, viewBox }) => {
  return (
    <svg
      width="100%"
      viewBox={viewBox || "-3 -3 6 4.5"}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", width: "100%", height: "auto" }}
      aria-hidden="true"
    >
      {dotted && (
        <>
          <defs>
            <pattern id="iso-dots" width="0.25" height="0.25" patternUnits="userSpaceOnUse">
              <circle cx="0.01" cy="0.01" r="0.015" fill="rgba(255,255,255,0.10)" />
            </pattern>
          </defs>
          <rect x="-20" y="-20" width="40" height="40" fill="url(#iso-dots)" />
        </>
      )}
      {children}
    </svg>
  );
};

export const IsoFloor = ({ size = 6, density = 0.5 }) => {
  const dots = [];
  for (let x = -size; x <= size; x += density) {
    for (let y = -size; y <= size; y += density) {
      const [sx, sy] = iso(x, y, 0);
      dots.push(<circle key={`${x}-${y}`} cx={sx} cy={sy} r="0.022" fill="rgba(255,255,255,0.13)" />);
    }
  }
  return <g>{dots}</g>;
};

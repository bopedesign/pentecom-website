/* eslint-disable */
/* Isometric helpers — DOSS-style solid glowing iso shapes on a dotted dark floor.
   3D → 2D iso projection:
     sx = (x - y) * cos(30°) = (x - y) * 0.8660
     sy = (x + y) * sin(30°) - z = (x + y) * 0.5 - z
   We work in "iso units" (1 unit = 1 cube edge) and let the parent SVG scale.
*/

const COS30 = 0.8660254;
const SIN30 = 0.5;

const iso = (x, y, z) => [(x - y) * COS30, (x + y) * SIN30 - z];

const join = (pts) => pts.map(p => p.join(",")).join(" ");

/** Isometric cube anchored at (x0, y0, z0) origin corner, with given size.
    color = brand-blue or a custom palette (top/left/right shades). */
const IsoCube = ({ x = 0, y = 0, z = 0, size = 1, palette = "blue", glow = true, opacity = 1 }) => {
  const s = size;
  // 8 corners
  const c000 = iso(x,     y,     z    );
  const c100 = iso(x + s, y,     z    );
  const c010 = iso(x,     y + s, z    );
  const c110 = iso(x + s, y + s, z    );
  const c001 = iso(x,     y,     z + s);
  const c101 = iso(x + s, y,     z + s);
  const c011 = iso(x,     y + s, z + s);
  const c111 = iso(x + s, y + s, z + s);

  const top   = [c001, c101, c111, c011]; // z = top
  const left  = [c010, c110, c111, c011]; // y = front (the "left" face visually)
  const right = [c100, c110, c111, c101]; // x = right

  const palettes = {
    blue: { top: "#3a5fbd", left: "#2f4d9e", right: "#203263" },
    red:  { top: "#e6c999", left: "#e6c999", right: "#b89968" },
    yellow: { top: "#d8a93a", left: "#ad7d12", right: "#7e5a0a" },
    brown: { top: "#9b7350", left: "#6e4a2c", right: "#4b321e" },
    light: { top: "#ffffff", left: "#dcdcdc", right: "#b5b5b5" },
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

/** Isometric stage — sets up the SVG, computes viewBox to fit children,
    and centers content. Children specify shapes in iso units. */
const IsoStage = ({ width = 600, height = 400, children, dotted = false, viewBox }) => {
  return (
    <svg
      width="100%"
      viewBox={viewBox || "-3 -3 6 4.5"}
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", width: "100%", height: "auto" }}
      aria-hidden="true"
    >
      {/* dotted floor pattern — drawn as a large rect with pattern fill */}
      {dotted && (
        <>
          <defs>
            <pattern id="iso-dots" width="0.25" height="0.25" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
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

/** A horizontal grid of small dots used as a "floor" beneath stacked cubes —
    drawn in iso so it follows the same projection. */
const IsoFloor = ({ size = 6, density = 0.5 }) => {
  const dots = [];
  for (let x = -size; x <= size; x += density) {
    for (let y = -size; y <= size; y += density) {
      const [sx, sy] = iso(x, y, 0);
      dots.push(<circle key={`${x}-${y}`} cx={sx} cy={sy} r="0.022" fill="rgba(255,255,255,0.13)" />);
    }
  }
  return <g>{dots}</g>;
};

Object.assign(window, { IsoCube, IsoStage, IsoFloor, iso });

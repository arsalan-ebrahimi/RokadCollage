// Shared section background pattern layer: Rokad signature
// Uses layout-pattern.png with mask-image fade (top/bottom) and alternating rotation.
// Rotate 0° for odd sections, 180° for even sections (alternating).
export default function PatternLayer({ rotate = 0 }) {
  return (
    <div aria-hidden="true" className="pattern-layer">
      <img
        src="/assets/Pattern/layout-pattern.png"
        alt=""
        aria-hidden="true"
        className="pattern-layer-img"
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    </div>
  );
}
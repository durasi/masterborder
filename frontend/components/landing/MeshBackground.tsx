/**
 * MeshBackground — three blurred, slowly-floating gradient orbs behind the page.
 * Fixed to viewport, z-index -10, pointer-events none.
 * Colors and animation keyframes are defined in globals.css.
 */
export function MeshBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="mb-mesh-orb-1 absolute rounded-full opacity-25 dark:opacity-20"
        style={{
          width: 520,
          height: 520,
          top: -180,
          left: -120,
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      <div
        className="mb-mesh-orb-2 absolute rounded-full opacity-25 dark:opacity-20"
        style={{
          width: 460,
          height: 460,
          top: "40%",
          right: -140,
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
      <div
        className="mb-mesh-orb-3 absolute rounded-full opacity-25 dark:opacity-20"
        style={{
          width: 380,
          height: 380,
          bottom: -100,
          left: "30%",
          filter: "blur(80px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

import styles from "./LoadingRing.module.scss";

export default function Loading({ size, innersize, border, color, position }) {
  var ringColor = "#fff";
  var ringSize = "20px";
  var innerRingSize = "20px";
  var ringBorder = "4px";
  var ringPosition = "-8px";
  if (color) {
    ringColor = color;
  }
  if (size) {
    ringSize = size;
  }
  if (innersize) {
    innerRingSize = innersize;
  }
  if (border) {
    ringBorder = border;
  }
  if (position) {
    ringPosition = position;
  }
  var borderProperty = ringBorder + " solid " + ringColor;
  var borderColor = ringColor + " transparent transparent transparent";

  return (
    <div
      style={{ height: ringSize, width: ringSize }}
      className={styles.ldsRing}
    >
      <div
        style={{
          border: borderProperty,
          width: innerRingSize,
          height: innerRingSize,
          borderColor: borderColor,
          top: ringPosition,
          right: ringPosition,
        }}
      ></div>
      <div
        style={{
          border: borderProperty,
          width: innerRingSize,
          height: innerRingSize,
          borderColor: borderColor,
          top: ringPosition,
          right: ringPosition,
        }}
      ></div>
      <div
        style={{
          border: borderProperty,
          width: innerRingSize,
          height: innerRingSize,
          borderColor: borderColor,
          top: ringPosition,
          right: ringPosition,
        }}
      ></div>
      <div
        style={{
          border: borderProperty,
          width: innerRingSize,
          height: innerRingSize,
          borderColor: borderColor,
          top: ringPosition,
          right: ringPosition,
        }}
      ></div>
    </div>
  );
}

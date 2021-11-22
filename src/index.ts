import { polygon, rect, withAttribs } from "@thi.ng/geom";
import { mulN2, Vec } from "@thi.ng/vectors";
import { concat, rotation23, translation23 } from "@thi.ng/matrices";
import { start } from "@thi.ng/hdom";
import { canvas } from "@thi.ng/hdom-canvas";
import { convertTree } from "@thi.ng/hiccup-svg";

const state = {
  rotation: 0,
  cameraMatrix: [1, 0, 0, 1, 0, 0],
};

function createScene(size: Vec, type: "svg" | "canvas", _content: any) {
  const content = ["g", { transform: state.cameraMatrix }, _content];

  if (type === "canvas") {
    return [canvas, { width: size[0], height: size[1] }, content];
  } else if (type === "svg") {
    const pr = devicePixelRatio ?? 1;
    return [
      "svg",
      {
        width: size[0] * pr,
        height: size[1] * pr,
        viewBox: `0 0 ${size[0] * pr} ${size[1] * pr}`,
      },
      convertTree(content),
    ];
  }
}

function doDraw(w: number, h: number) {
  const { rotation } = state;
  const center = [w / 2, h / 2];

  const trianglePoints = [
    [270.8333333333333, 62.5],
    [239.58333333333334, 80.5421959121758],
    [239.58333333333331, 44.4578040878242],
  ];

  const poly = polygon(trianglePoints, {
    stroke: "black",
    fill: "none",
  });

  const pivot = center;
  const transformTriangle = concat(
    [],
    translation23([], pivot),
    rotation23([], rotation),
    translation23([], mulN2([], pivot, -1))
  );

  return [
    "g",
    {},
    withAttribs(rect([0, 0], [w, h]), { fill: "#2E3440" }),
    rect([0, 0], [w, h], { fill: "none", stroke: "black" }),
    ["g", { transform: transformTriangle }, poly],
  ];
}

const containerCanvas = document.createElement("div");
document.body.appendChild(containerCanvas);
const containerSvg = document.createElement("div");
document.body.appendChild(containerSvg);

const w = 500;
const h = 250 / 2;

start(() => createScene([w, h], "canvas", doDraw(w, h)), {
  root: containerCanvas,
});
start(() => createScene([w, h], "svg", doDraw(w, h)), {
  root: containerSvg,
});

setInterval(() => {
  state.rotation += 0.03;
}, 100);

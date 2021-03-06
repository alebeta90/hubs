import { Pose } from "../pose";
import { angleTo4Direction } from "../../../utils/dpad";

const zeroVec2 = [0, 0];
export const xforms = {
  noop: function() {},
  copy: function(frame, src, dest) {
    frame[dest.value] = frame[src.value];
  },
  scale: function(scalar) {
    return function scale(frame, src, dest) {
      if (frame[src.value] !== undefined) {
        frame[dest.value] = frame[src.value] * scalar;
      }
    };
  },
  deadzone: function(deadzoneSize) {
    return function deadzone(frame, src, dest) {
      frame[dest.value] = Math.abs(frame[src.value]) < deadzoneSize ? 0 : frame[src.value];
    };
  },
  split_vec2: function(frame, src, dest) {
    if (frame[src.value] !== undefined) {
      frame[dest.x] = frame[src.value][0];
      frame[dest.y] = frame[src.value][1];
    }
  },
  compose_vec2: function(frame, src, dest) {
    if (frame[src.x] !== undefined && frame[src.y] !== undefined) {
      frame[dest.value] = [frame[src.x], frame[src.y]];
    }
  },
  negate: function(frame, src, dest) {
    frame[dest.value] = -frame[src.value];
  },
  copyIfFalse: function(frame, src, dest) {
    frame[dest.value] = frame[src.bool] ? undefined : frame[src.value];
  },
  copyIfTrue: function(frame, src, dest) {
    frame[dest.value] = frame[src.bool] ? frame[src.value] : undefined;
  },
  zeroIfDefined: function(frame, src, dest) {
    frame[dest.value] = frame[src.bool] !== undefined ? 0 : frame[src.value];
  },
  true: function(frame, src, dest) {
    frame[dest.value] = true;
  },
  rising: function rising(frame, src, dest, prevState) {
    frame[dest.value] = frame[src.value] && prevState === false;
    return !!frame[src.value];
  },
  risingWithFrameDelay: function(n) {
    return function risingWithFrameDelay(frame, src, dest, state = { values: new Array(n) }) {
      frame[dest.value] = state.values.shift();
      state.values.push(frame[src.value] && !state.prev);
      state.prev = frame[src.value];
      return state;
    };
  },
  falling: function falling(frame, src, dest, prevState) {
    frame[dest.value] = !frame[src.value] && prevState;
    return !!frame[src.value];
  },
  vec2Zero: function(frame, _, dest) {
    frame[dest.value] = zeroVec2;
  },
  poseFromCameraProjection: function() {
    let camera;
    const pose = new Pose();
    return function poseFromCameraProjection(frame, src, dest) {
      if (!camera) {
        camera = document.querySelector("#player-camera").components.camera.camera;
      }
      frame[dest.value] = pose.fromCameraProjection(camera, frame[src.value][0], frame[src.value][1]);
    };
  },
  vec2dpad: function(deadzoneRadius, invertX = false, invertY = false) {
    const deadzoneRadiusSquared = deadzoneRadius * deadzoneRadius;

    return function vec2dpad(frame, src, dest) {
      if (!frame[src.value]) return;
      const [x, y] = frame[src.value];
      const inCenter = x * x + y * y < deadzoneRadiusSquared;
      const direction = inCenter ? "center" : angleTo4Direction(Math.atan2(invertX ? -x : x, invertY ? -y : y));
      if (!dest[direction]) return;
      frame[dest[direction]] = true;
    };
  },
  always: function(constValue) {
    return function always(frame, _, dest) {
      frame[dest.value] = constValue;
    };
  },
  wasd_to_vec2: function(frame, { w, a, s, d }, { vec2 }) {
    let x = 0;
    let y = 0;
    if (frame[a]) x -= 1;
    if (frame[d]) x += 1;
    if (frame[w]) y += 1;
    if (frame[s]) y -= 1;
    frame[vec2] = [x, y];
  },
  add_vec2: function(frame, src, dest) {
    const first = frame[src.first];
    const second = frame[src.second];
    if (first && second) {
      frame[dest.value] = [first[0] + second[0], first[1] + second[1]];
    } else if (second) {
      frame[dest.value] = second;
    } else if (first) {
      frame[dest.value] = first;
    }
  },
  max_vec2: function(frame, src, dest) {
    const first = frame[src.first];
    const second = frame[src.second];
    if (first && second) {
      frame[dest.value] =
        first[0] * first[0] + first[1] * first[1] > second[0] * second[0] + second[1] * second[1] ? first : second;
    } else if (second) {
      frame[dest.value] = second;
    } else if (first) {
      frame[dest.value] = first;
    }
  },
  normalize_vec2: function(frame, src, dest) {
    const vec2 = frame[src.value];
    if (vec2) {
      if (vec2[0] === 0 && vec2[0] === 0) {
        frame[dest.value] = vec2;
      } else {
        const l = Math.sqrt(vec2[0] * vec2[0] + vec2[1] * vec2[1]);
        frame[dest.value] = [vec2[0] / l, vec2[1] / l];
      }
    }
  },
  all: function(frame, src, dest) {
    for (const path in src) {
      if (!frame[src[path]]) {
        frame[dest.value] = false;
        return;
      }
    }
    frame[dest.value] = true;
  },
  any: function(frame, src, dest) {
    for (const path in src) {
      if (frame[src[path]]) {
        frame[dest.value] = true;
        return;
      }
    }
    frame[dest.value] = false;
  },
  touch_axis_scroll(scale = 1) {
    return function touch_axis_scroll(frame, src, dest, state = { value: 0, touching: false }) {
      frame[dest.value] = state.touching && frame[src.touching] ? scale * (frame[src.value] - state.value) : 0;
      state.value = frame[src.value];
      state.touching = frame[src.touching];
      return state;
    };
  }
};

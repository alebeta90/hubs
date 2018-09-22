import { paths } from "./paths";
import { sets } from "./sets";
import { xforms } from "./xforms";

const xboxUnscaledCursorScalePenTip = "foobarbazbotbooch";

export const xboxBindings = {
  [sets.cursorHoldingInteractable]: [
    {
      src: { value: paths.device.xbox.button("rightTrigger").pressed },
      dest: { value: paths.app.cursorDrop },
      xform: xforms.falling(),
      root: "xboxRightTriggerFalling",
      priority: 100
    },
    {
      src: {
        bool: paths.device.xbox.button("leftTrigger").pressed,
        value: paths.device.xbox.axis("leftJoystickVertical")
      },
      dest: { value: "/vars/xbox/cursorModDelta" },
      xform: xforms.copyIfTrue
    },
    {
      src: {
        value: "/vars/xbox/cursorModDelta"
      },
      dest: { value: paths.app.cursorModDelta },
      xform: xforms.copy
    },
    {
      src: {
        bool: paths.device.xbox.button("leftTrigger").pressed,
        value: paths.device.xbox.axis("leftJoystickVertical")
      },
      dest: { value: "/var/xbox/leftJoystickVertical" },
      xform: xforms.copyIfFalse,
      root: "xbox/leftJoystick",
      priority: 200
    }
  ],
  [sets.cursorHoldingPen]: [
    {
      src: { value: paths.device.xbox.button("rightTrigger").pressed },
      dest: { value: paths.app.cursorStartDrawing },
      xform: xforms.rising(),
      root: "xboxRightTriggerRising",
      priority: 200
    },
    {
      src: { value: paths.device.xbox.button("rightTrigger").pressed },
      dest: { value: paths.app.cursorStopDrawing },
      xform: xforms.falling(),
      root: "xboxRightTriggerFalling",
      priority: 200
    },
    {
      src: { value: paths.device.xbox.button("b").pressed },
      dest: { value: paths.app.cursorDrop },
      xform: xforms.rising()
    },
    {
      src: { value: paths.device.xbox.button("y").pressed },
      dest: { value: paths.noop },
      xform: xforms.noop,
      root: "xbox/y",
      priority: 200
    },
    {
      src: { value: paths.device.xbox.button("a").pressed },
      dest: { value: paths.app.cursorPenNextColor },
      xform: xforms.rising()
    },
    {
      src: { value: paths.device.xbox.button("x").pressed },
      dest: { value: paths.app.cursorPenPrevColor },
      xform: xforms.rising()
    },
    {
      src: {
        bool: paths.device.xbox.button("leftTrigger").pressed,
        value: paths.device.xbox.axis("rightJoystickVertical")
      },
      dest: { value: xboxUnscaledCursorScalePenTip},
      xform: xforms.copyIfTrue
    },
      {
          dest: {
              value: paths.app.cursorScalePenTip
          },
          src: { value: xboxUnscaledCursorScalePenTip},
          xform: xforms.scale(0.01)
      }
  ],
  [sets.global]: [
    {
      src: {
        value: paths.device.xbox.axis("rightJoystickHorizontal")
      },
      dest: { value: "/var/xbox/scaledRightJoystickHorizontal" },
      xform: xforms.scale(-1.5) // horizontal look speed modifier
    },
    {
      src: {
        value: paths.device.xbox.axis("rightJoystickVertical")
      },
      dest: { value: "/var/xbox/scaledRightJoystickVertical" },
      xform: xforms.scale(-1.25) // vertical look speed modifier
    },
    {
      src: {
        x: "/var/xbox/scaledRightJoystickHorizontal",
        y: "/var/xbox/scaledRightJoystickVertical"
      },
      dest: { value: paths.app.cameraDelta },
      xform: xforms.compose_vec2
    },
    {
      src: {
        value: paths.device.xbox.axis("leftJoystickHorizontal")
      },
      dest: { value: "/var/xbox/scaledLeftJoystickHorizontal" },
      xform: xforms.scale(1.5) // horizontal move speed modifier
    },
    {
      src: { value: paths.device.xbox.axis("leftJoystickVertical") },
      dest: { value: "/var/xbox/leftJoystickVertical" },
      xform: xforms.copy,
      root: "xbox/leftJoystick",
      priority: 100
    },
    {
      src: { value: "/var/xbox/leftJoystickVertical" },
      dest: { value: "/var/xbox/scaledLeftJoystickVertical" },
      xform: xforms.scale(-1.25) // vertical move speed modifier
    },
    {
      src: {
        x: "/var/xbox/scaledLeftJoystickHorizontal",
        y: "/var/xbox/scaledLeftJoystickVertical"
      },
      dest: { value: paths.app.characterAcceleration },
      xform: xforms.compose_vec2
    },
    {
      src: { value: paths.device.xbox.button("leftTrigger").pressed },
      dest: { value: paths.app.boost },
      xform: xforms.copy
    },
    {
      src: { value: paths.device.xbox.button("leftBumper").pressed },
      dest: { value: paths.app.snapRotateLeft },
      xform: xforms.rising()
    },
    {
      src: { value: paths.device.xbox.button("rightBumper").pressed },
      dest: { value: paths.app.snapRotateRight },
      xform: xforms.rising()
    },
    {
      src: { value: paths.device.xbox.button("dpadUp").pressed },
      dest: { value: paths.app.translate.up },
      xform: xforms.scale(0.1)
    },
    {
      src: { value: paths.device.xbox.button("dpadDown").pressed },
      dest: { value: paths.app.translate.down },
      xform: xforms.scale(0.1)
    },
    {
      dest: { value: "var/vec2/zero" },
      xform: xforms.vec2Zero
    },
    {
      src: { value: "var/vec2/zero" },
      dest: { value: paths.app.cursorPose },
      xform: xforms.poseFromCameraProjection()
    },
    {
      src: { value: paths.device.xbox.button("y").pressed },
      dest: { value: paths.app.spawnPen },
      xform: xforms.rising(),
      root: "xbox/y",
      priority: 100
    }
  ],
  [sets.cursorHoveringOnInteractable]: [
    {
      src: { value: paths.device.xbox.button("rightTrigger").pressed },
      dest: { value: paths.app.cursorGrab },
      xform: xforms.rising(),
      root: "xboxRightTriggerRising",
      priority: 100
    }
  ]
};

export const gamepadBindings = {};

export const touchscreenBindings = {
  [sets.global]: [
    {
      src: { value: paths.device.touchscreen.cursorPose },
      dest: { value: paths.app.cursorPose },
      xform: xforms.copy
    },
    {
      src: { value: paths.device.touchscreen.cameraDelta },
      dest: { x: "/var/touchscreenCamDeltaX", y: "/var/touchscreenCamDeltaY" },
      xform: xforms.split_vec2
    },
    {
      src: { value: "/var/touchscreenCamDeltaX" },
      dest: { value: "/var/touchscreenCamDeltaXScaled" },
      xform: xforms.scale(0.18)
    },
    {
      src: { value: "/var/touchscreenCamDeltaY" },
      dest: { value: "/var/touchscreenCamDeltaYScaled" },
      xform: xforms.scale(0.35)
    },
    {
      src: { x: "/var/touchscreenCamDeltaXScaled", y: "/var/touchscreenCamDeltaYScaled" },
      dest: { value: paths.app.cameraDelta },
      xform: xforms.compose_vec2
    },
    {
      src: { value: paths.device.touchscreen.isTouchingGrabbable },
      dest: { value: paths.app.cursorGrab },
      xform: xforms.copy,
      root: "touchscreen.isTouchingGrabbable",
      priority: 100
    },
    {
      src: { value: paths.device.hud.penButton },
      dest: { value: paths.app.spawnPen },
      xform: xforms.rising(),
      root: "hud.penButton",
      priority: 100
    }
  ],
  [sets.cursorHoldingInteractable]: [
    {
      src: { value: paths.device.touchscreen.isTouchingGrabbable },
      dest: { value: paths.app.cursorDrop },
      xform: xforms.falling(),
      root: "touchscreen.cursorDrop",
      priority: 100
    }
  ],

  [sets.cursorHoveringOnPen]: [],
  [sets.cursorHoldingPen]: [
    {
      src: { value: paths.device.touchscreen.isTouchingGrabbable },
      dest: { value: paths.noop },
      xform: xforms.noop,
      root: "touchscreen.cursorDrop",
      priority: 200
    },
    {
      src: { value: paths.device.touchscreen.isTouchingGrabbable },
      dest: { value: paths.app.cursorStartDrawing },
      xform: xforms.risingWithFrameDelay(5)
    },
    {
      src: { value: paths.device.touchscreen.isTouchingGrabbable },
      dest: { value: paths.app.cursorStopDrawing },
      xform: xforms.falling()
    },
    {
      src: { value: paths.device.hud.penButton },
      dest: { value: paths.app.cursorDrop },
      xform: xforms.rising(),
      root: "hud.penButton",
      priority: 200
    }
  ]
};

export const keyboardDebugBindings = {
  [sets.global]: [
    {
      src: {
        value: paths.device.keyboard.key("l")
      },
      dest: {
        value: paths.app.logDebugFrame
      },
      xform: xforms.rising()
    }
  ]
};

export const KBMBindings = {
  [sets.global]: [
    {
      src: { value: paths.device.keyboard.key("shift") },
      dest: { value: paths.app.boost },
      xform: xforms.copy
    },
    {
      src: { value: paths.device.keyboard.key("q") },
      dest: { value: paths.app.snapRotateLeft },
      xform: xforms.rising(),
      root: "q",
      priority: 100
    },
    {
      src: { value: paths.device.keyboard.key("e") },
      dest: { value: paths.app.snapRotateRight },
      xform: xforms.rising(),
      root: "e",
      priority: 100
    },
    {
      src: { value: paths.device.hud.penButton },
      dest: { value: paths.app.spawnPen },
      xform: xforms.rising()
    },
    {
      src: { value: paths.device.smartMouse.cursorPose },
      dest: { value: paths.app.cursorPose },
      xform: xforms.copy
    },
    {
      src: { value: paths.device.smartMouse.cameraDelta },
      dest: { x: "/var/smartMouseCamDeltaX", y: "/var/smartMouseCamDeltaY" },
      xform: xforms.split_vec2
    },
    {
      src: { value: "/var/smartMouseCamDeltaX" },
      dest: { value: "/var/smartMouseCamDeltaXScaled" },
      xform: xforms.scale(-0.06)
    },
    {
      src: { value: "/var/smartMouseCamDeltaY" },
      dest: { value: "/var/smartMouseCamDeltaYScaled" },
      xform: xforms.scale(-0.1)
    },
    {
      src: { x: "/var/smartMouseCamDeltaXScaled", y: "/var/smartMouseCamDeltaYScaled" },
      dest: { value: paths.app.cameraDelta },
      xform: xforms.compose_vec2
    },
    {
      src: { value: paths.device.mouse.buttonLeft },
      dest: { value: paths.app.cursorDrop },
      xform: xforms.falling(),
      priority: 100,
      root: "lmb"
    },
    {
      src: {
        value: paths.device.keyboard.key("l")
      },
      dest: {
        value: paths.app.logDebugFrame
      },
      xform: xforms.rising()
    }
  ],

  [sets.cursorHoldingPen]: [
    {
      src: {
        bool: paths.device.keyboard.key("shift"),
        value: paths.device.keyboard.key("q")
      },
      dest: { value: "/var/shift+q" },
      xform: xforms.copyIfTrue
    },
    {
      src: { value: "/var/shift+q" },
      dest: { value: paths.app.cursorPenPrevColor },
      xform: xforms.rising()
    },
    {
      src: {
        bool: paths.device.keyboard.key("shift"),
        value: paths.device.keyboard.key("e")
      },
      dest: { value: "/var/shift+e" },
      xform: xforms.copyIfTrue
    },
    {
      src: { value: "/var/shift+e" },
      dest: { value: paths.app.cursorPenNextColor },
      xform: xforms.rising()
    },
    {
      src: {
        bool: paths.device.keyboard.key("shift"),
        value: paths.device.keyboard.key("q")
      },
      dest: { value: "/var/notshift+q" },
      xform: xforms.copyIfFalse
    },
    {
      src: { value: "/var/notshift+q" },
      dest: { value: paths.app.snapRotateLeft },
      xform: xforms.rising(),
      root: "q",
      priority: 200
    },
    {
      src: {
        bool: paths.device.keyboard.key("shift"),
        value: paths.device.keyboard.key("e")
      },
      dest: { value: "/var/notshift+e" },
      xform: xforms.copyIfFalse
    },
    {
      src: { value: "/var/notshift+e" },
      dest: { value: paths.app.snapRotateRight },
      xform: xforms.rising(),
      root: "e",
      priority: 200
    },
    {
      src: { value: paths.device.mouse.buttonLeft },
      dest: { value: paths.app.cursorStartDrawing },
      xform: xforms.rising(),
      priority: 200
    },
    {
      src: { value: paths.device.mouse.buttonLeft },
      dest: { value: paths.app.cursorStopDrawing },
      xform: xforms.falling(),
      priority: 200,
      root: "lmb"
    },
    {
      src: { value: paths.device.mouse.buttonRight },
      dest: { value: paths.app.cursorDrop },
      xform: xforms.falling(),
      priority: 200
    },
    {
      src: {
        bool: paths.device.keyboard.key("shift"),
        value: paths.device.mouse.wheel
      },
      dest: { value: "/var/cursorScalePenTipWheel" },
      xform: xforms.copyIfTrue,
      priority: 200,
      root: "wheel"
    },
    {
      src: { value: "/var/cursorScalePenTipWheel" },
      dest: { value: paths.app.cursorScalePenTip },
      xform: xforms.scale(0.12)
    }
  ],

  [sets.cursorHoldingInteractable]: [
    {
      src: {
        value: paths.device.mouse.wheel
      },
      dest: {
        value: paths.app.cursorModDelta
      },
      xform: xforms.copy,
      root: "wheel",
      priority: 100
    },
    {
      src: {
        bool: paths.device.keyboard.key("shift"),
        value: paths.device.mouse.wheel
      },
      dest: { value: paths.app.cursorModDelta },
      xform: xforms.copyIfFalse
    }
  ],

  [sets.cursorHoveringOnInteractable]: [
    {
      src: { value: paths.device.mouse.buttonLeft },
      dest: { value: paths.app.cursorGrab },
      xform: xforms.rising()
    }
  ]
};

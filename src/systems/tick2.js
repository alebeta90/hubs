// i don't recommend using this...
// wrote this while thinking thru tick order and ways hubs can alter its usual contract w/ aframe
AFRAME.registerSystem("tick2", {
  tick(t, dt) {
    AFRAME.scenes[0].systemNames[0] = "tick2";
    AFRAME.scenes[0].systemNames.length = 1;
    const systems = AFRAME.scenes[0].systems;
    systems["userinput"].tick(t, dt);

    // as far as i know, the rest can occur in any order
    const unordered = [
      "app-mode",
      "camera",
      "camera-mirror",
      "camera-tools",
      "collision-filter",
      "exit-on-blur",
      "frame-scheduler",
      "geometry",
      "light",
      "material",
      "motion-capture-replayer",
      "nav",
      "permissions",
      "personal-space-bubble",
      "physics",
      "recordingdb",
      "rotate-selected-object",
      "shadow",
      "super-hands",
      "tracked-controls",
      "userinput-debug"
    ];
    unordered.forEach(s => {
      systems[s].tick && systems[s].tick(t, dt);
    });
  }
});

import Analytics, { AnalyticsInstance } from "analytics";

import MatterbeamPlugin from "../src";

describe("MatterbeamPlugin", () => {
  let analytics: AnalyticsInstance;
  let plugin;

  beforeEach(() => {
    plugin = MatterbeamPlugin({});

    analytics = Analytics({
      app: "test-instance",
      plugins: [plugin]
    });
  });

  it("should allow creation on new analytics instances", () => {
    expect(analytics).not.toBeUndefined();
  });

  describe("#initialize", () => {
    it.todo("should be tested");
  });

  describe("#track", () => {
    it.todo("should be tested");
  });
});

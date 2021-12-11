import Analytics, { AnalyticsInstance } from "analytics";
import load from "@segment/load-script";

import PendoPlugin from "../src";

jest.mock("@segment/load-script");

const sleep = (ms = 20) => new Promise(resolve => setTimeout(resolve, ms));

describe("PendoPlugin", () => {
  const loadMock = load as jest.Mock;

  const apiKey = "mock-api-key";

  const accountId = "mock-user-account-id";
  const userId = "mock-user-id";

  let analytics: AnalyticsInstance;
  let plugin;

  beforeEach(() => {
    loadMock.mockReset().mockImplementationOnce(() => {
      window.pendo = ({
        identify: jest.fn(),
        initialize: jest.fn(),
        isReady: jest.fn().mockReturnValue(true),
        track: jest.fn()
      } as unknown) as typeof window.pendo;
    });

    plugin = PendoPlugin({ apiKey });

    analytics = Analytics({
      app: "test-instance",
      plugins: [plugin]
    });
  });

  describe("#initialize", () => {
    let readyMock = jest.fn();

    beforeEach(async () => {
      readyMock.mockReset();
      analytics.ready(readyMock);

      analytics.page();
      await sleep();
    });

    it("should load the pendo script", async () => {
      expect(loadMock).toHaveBeenCalledWith(
        `https://cdn.pendo.io/agent/static/${apiKey}/pendo.js`
      );
      expect(window.pendo).not.toBeUndefined();
    });

    it("should enter ready state", async () => {
      expect(readyMock).toHaveBeenCalled();
    });
  });

  describe("#identify", () => {
    beforeEach(async () => {
      analytics.identify(userId, { account: { id: accountId } });
      await sleep();
    });

    it("should call the pendo identify event with parsed traits", () => {
      expect(window.pendo.identify).toHaveBeenCalledWith({
        account: { id: accountId },
        visitor: { id: userId }
      });
    });
  });

  describe("#track", () => {
    const eventName = "mock-track-event";
    const eventPayload = { key: "value" };

    beforeEach(async () => {
      analytics.track(eventName, eventPayload);
      await sleep();
    });

    it("should call the pendo track event", () => {
      expect(window.pendo.track).toHaveBeenCalledWith(eventName, eventPayload);
    });
  });
});

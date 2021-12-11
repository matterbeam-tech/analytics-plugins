import { AnalyticsInstance, AnalyticsPlugin } from "analytics";
import load from "@segment/load-script";

export interface PendoPlugin extends AnalyticsPlugin {
  config: PluginConfig;

  initialize: (props: {
    config: PluginConfig;
    instance: AnalyticsInstance;
  }) => any;

  identify: (props: {
    config: PluginConfig;
    instance: AnalyticsInstance;
    payload: {
      userId: string;
      traits?: {
        account?: Record<string, any>;
        [key: string]: any;
      };
    };
  }) => any;

  track?: (props: {
    config: PluginConfig;
    instance: AnalyticsInstance;
    payload: { event: string; properties: any };
  }) => any;
}

export interface PluginConfig {
  apiKey: string;
}

const defaults: Partial<PluginConfig> = {};

export default function plugin(config: PluginConfig): PendoPlugin {
  return {
    name: "pendo",
    config: { ...defaults, ...config },

    initialize: ({ config }) => {
      if (!config.apiKey) throw new Error("Pendo apiKey required");

      window.pendo_config = window.pendo_config || {
        apiKey: config.apiKey
      };

      if (typeof window.pendo === "undefined") {
        load(`https://cdn.pendo.io/agent/static/${config.apiKey}/pendo.js`);
      }

      window.pendo.initialize();
    },

    loaded: () => !!window.pendo && window.pendo.isReady(),

    identify: ({ instance, payload }) => {
      if (typeof window.pendo === "undefined") return;

      const { traits = {} } = payload;

      const visitor = {
        ...traits.visitor,
        id: instance.user("userId")
      };

      window.pendo.identify({ ...traits, visitor });
    },

    track: ({ payload }) => {
      if (typeof window.pendo === "undefined") return;

      window.pendo.track(payload.event, payload.properties);
    }
  };
}

import { AnalyticsInstance, AnalyticsPlugin } from "analytics";

export interface MatterbeamPlugin extends AnalyticsPlugin {
  config: PluginConfig;

  initialize: (props: {
    config: PluginConfig;
    instance: AnalyticsInstance;
  }) => any;

  track?: (props: {
    config: PluginConfig;
    instance: AnalyticsInstance;
    payload: { event: string; properties: any };
  }) => any;
}

export interface PluginConfig {}

const defaults: Partial<PluginConfig> = {};

export default function plugin(config: PluginConfig): MatterbeamPlugin {
  return {
    name: "matterbeam",
    config: { ...defaults, ...config },

    initialize: () => {},

    loaded: () => true,

    track: () => {}
  };
}

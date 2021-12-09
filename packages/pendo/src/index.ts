import { AnalyticsInstance } from "analytics";

export interface IPluginProps {
  instance: AnalyticsInstance;
  config: IPluginConfig;
}

type IPluginConfig = {
  appId: string;
};

const defaults = {
  enabled: true
};

export default function plugin(config: IPluginConfig) {
  return {
    name: "pendo-analytics",
    config: { ...defaults, ...config },

    initialize: (_plugin: IPluginProps) => {},

    loaded: () => {},

    identify: () => {},

    track: () => {}
  };
}

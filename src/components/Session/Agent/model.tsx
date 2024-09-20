import React from "react";
import { VoiceEvent } from "chat-bot-rtvi-client";
import { useVoiceClient, useVoiceClientEvent } from "chat-bot-rtvi-web-react";

import styles from "./styles.module.css";

const ModelBadge: React.FC = () => {
  const voiceClient = useVoiceClient()!;
  const [model, setModel] = React.useState<string | undefined>(undefined);

  const getModelFromConfig = () => {
    if (!voiceClient) return;

    voiceClient.getServiceOptionsFromConfig("llm").options.find((option) => {
      if (option.name === "model") {
        setModel(option.value as string);
      }
    });
  };

  useVoiceClientEvent(VoiceEvent.ConfigUpdated, () => {
    if (!voiceClient) return;
    getModelFromConfig();
  });

  return <div className={styles.modelBadge}>{model}</div>;
};

export default ModelBadge;

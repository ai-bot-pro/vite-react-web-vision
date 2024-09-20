export const BOT_READY_TIMEOUT = 30 * 1000; // 30 seconds

export const defaultBotProfile = "vision_2024_08";
export const defaultMaxDuration = 600;

export const defaultServices = {
  pipeline: "achatbot",
  vad: "silero",
  asr: "sense_voice",
  llm: "transformers_manual_vision_qwen",
  tts: "edge",
};

export const defaultTaskConnector = {
  "tag": "redis_queue_connector",
  "args": {
    "host": "redis-11446.c277.us-east-1-3.ec2.redns.redis-cloud.com",
    "port": "11446",
    "db": 0
  }
};

export const defaultConfig = [
  {
    service: "vad",
    options: [
      { name: "tag", value: "silero_vad_analyzer" },
      { name: "args", value: {"stop_secs": 0.7} },
    ],
  },
  {
    service: "asr",
    options: [
      { name: "tag", value: "sense_voice_asr" },
      {
        name: "args", value: {
          "language": "zn",
          "model_name_or_path": "./models/FunAudioLLM/SenseVoiceSmall"
        }
      },
    ],
  },
  {
    service: "llm",
    options: [
      { name: "tag", value: "llm_transformers_manual_vision_qwen" },
      {
        name: "args",
        value: {
          "lm_device":"cuda",
          "lm_model_name_or_path":"./models/Qwen/Qwen2-VL-2B-Instruct",
          "chat_history_size": 0,
          "init_chat_prompt":"请用中文交流",
          "model_type":"chat_completion"
        },
      },
      { name: "language", value: "zh" },
    ],
  },
  {
    service: "tts",
    options: [
      { name: "tag", value: "tts_edge" },
      {
        name: "args", value: {
          "voice_name": "zh-CN-YunjianNeural",
          "language": "zh",
          "gender": "Male"
        }
      },
    ],
  },
];

export const defaultConfigDict = defaultConfig.reduce((acc, config) => {
  const serviceKey = config.service as keyof typeof acc;
  acc[serviceKey] = config.options.reduce((optAcc, option) => {
    optAcc[option.name] = option.value;
    return optAcc;
  }, {} as { [key: string]: any });
  return acc;
}, {} as { [key: string]: any });

export const TTS_VOICES = [
  { name: "Chinese Man", value: "zh-CN-YunjianNeural" },
];

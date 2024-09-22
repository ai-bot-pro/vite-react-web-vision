export const BOT_READY_TIMEOUT = 30 * 1000; // 30 seconds

export const defaultBotProfile = "vision_2024_08";
export const defaultMaxDuration = 600;
const configMode: string = import.meta.env.VITE_CONFIG_MODE;
const visionModel: string = import.meta.env.VITE_VISION_MODEL ? import.meta.env.VITE_VISION_MODEL : "./models/Qwen/Qwen2-VL-2B-Instruct";
const taskConnectorTag = import.meta.env.VITE_TASK_CONNECTOR_TAG;
const redisHost = import.meta.env.VITE_REDIS_HOST;
const redisPort = import.meta.env.VITE_REDIS_PORT;
const redisDB = import.meta.env.VITE_REDIS_DB;

export const defaultServices = {
  pipeline: "achatbot",
  vad: "silero",
  asr: "deepgram",
  llm: "mock_vision",
  tts: "edge",
};

export const defaultTaskConnector = {
  "tag": taskConnectorTag,
  "args": {
    "host": redisHost,
    "port": redisPort,
    "db": redisDB,
  }
};

export const defaultMockVisionConfig = [
  {
    service: "pipeline",
    options: [
      { name: "allow_interruptions", value: false },
      { name: "enable_metrics", value: true },
      { name: "report_only_initial_ttfb", value: true },
    ],
  },
  {
    service: "daily_room_stream",
    options: [
      { name: "audio_in_enabled", value: true },
      { name: "audio_out_enabled", value: true },
      // !NOTE: if use asr, transcription_enabled is closed
      { name: "transcription_enabled", value: true },
      {
        name: "transcription_settings",
        value: {
          language: "en",
          tier: "nova",
          model: "2-conversationalai",
        },
      },
      { name: "vad_enabled", value: true },
      { name: "vad_audio_passthrough", value: true },
      //{ name: "camera_out_enabled", value: true },
      //{ name: "camera_out_is_live", value: true },
      //{ name: "camera_out_width", value: 1280 },
      //{ name: "camera_out_height", value: 720 },
    ],
  },
  {
    service: "vad",
    options: [
      { name: "tag", value: "silero_vad_analyzer" },
      { name: "args", value: { "stop_secs": 0.7 } },
    ],
  },
  //{
  //  service: "asr",
  //  options: [
  //    { name: "args", value: { language: "zh", model: "nova-2" } },
  //    { name: "tag", value: "deepgram_asr_processor" },
  //  ],
  //},
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
      { name: "tag", value: "mock_vision_llm" },
    ],
  },
  //{
  //  service: "llm",
  //  options: [
  //    { name: "model", value: "llama-3.1-70b-versatile" },
  //    { name: "base_url", value: "https://api.groq.com/openai/v1" },
  //    {
  //      name: "messages",
  //      value: [
  //        {
  //          role: "system",
  //          content:
  //            //"You are a assistant called Frankie. You can ask me anything. Keep responses brief and legible. Please communicate in Chinese",
  //            "我是你的老板，你是一个叫弗兰基的助理。你可以问我任何问题。保持回答简短和清晰。请用中文回答。第一句话请说：老板您好，元气满满的一天，加油！",
  //        },
  //      ],
  //    },
  //    { name: "tag", value: "openai_llm_processor" },
  //  ],
  //},
  {
    service: "tts",
    options: [
      { name: "language", value: "zh" },
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

export const defaultVisionConfig = [
  {
    service: "pipeline",
    options: [
      { name: "allow_interruptions", value: false },
      { name: "enable_metrics", value: true },
      { name: "report_only_initial_ttfb", value: true },
    ],
  },
  {
    service: "daily_room_stream",
    options: [
      { name: "audio_in_enabled", value: true },
      { name: "audio_out_enabled", value: true },
      // !NOTE: if use asr, transcription_enabled is closed
      { name: "transcription_enabled", value: true },
      {
        name: "transcription_settings",
        value: {
          language: "en",
          tier: "nova",
          model: "2-conversationalai",
        },
      },
      { name: "vad_enabled", value: true },
      { name: "vad_audio_passthrough", value: true },
      //{ name: "camera_out_enabled", value: true },
      //{ name: "camera_out_is_live", value: true },
      //{ name: "camera_out_width", value: 1280 },
      //{ name: "camera_out_height", value: 720 },
    ],
  },
  {
    service: "vad",
    options: [
      { name: "tag", value: "silero_vad_analyzer" },
      { name: "args", value: { "stop_secs": 0.7 } },
    ],
  },
  //{
  //  service: "asr",
  //  options: [
  //    { name: "args", value: { language: "zh", model: "nova-2" } },
  //    { name: "tag", value: "deepgram_asr_processor" },
  //  ],
  //},
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
          "lm_device": "cuda",
          "lm_model_name_or_path": visionModel,
          "chat_history_size": 0,
          "init_chat_prompt": "请用中文交流",
          "model_type": "chat_completion"
        },
      },
      { name: "language", value: "zh" },
    ],
  },
  //{
  //  service: "llm",
  //  options: [
  //    { name: "model", value: "llama-3.1-70b-versatile" },
  //    { name: "base_url", value: "https://api.groq.com/openai/v1" },
  //    {
  //      name: "messages",
  //      value: [
  //        {
  //          role: "system",
  //          content:
  //            //"You are a assistant called Frankie. You can ask me anything. Keep responses brief and legible. Please communicate in Chinese",
  //            "我是你的老板，你是一个叫弗兰基的助理。你可以问我任何问题。保持回答简短和清晰。请用中文回答。第一句话请说：老板您好，元气满满的一天，加油！",
  //        },
  //      ],
  //    },
  //    { name: "tag", value: "openai_llm_processor" },
  //  ],
  //},
  {
    service: "tts",
    options: [
      { name: "language", value: "zh" },
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

export const defaultConfig = configMode == "vision" ? defaultVisionConfig : defaultMockVisionConfig;

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

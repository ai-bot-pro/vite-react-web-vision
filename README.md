# React + TypeScript + Vite + TailwindCSS + Vision & Voice Bot
web vision & voice chat bot, the bot can describe images and listen to voice commands

## Run

Create a `.env.local` in your root with a custom baseURL if you are running your own infra:

```
VITE_BASE_URL=http://...
VITE_SHOW_SPLASH=
VITE_SHOW_SPLASH=
VITE_SERVER_AUTH= # JWT token for backend
VITE_BOT_READY_TIMEOUT=15000 # 15 seconds
```

```
yarn install
yarn run dev
```

# References

- https://vitejs.dev/guide/
- https://tailwindcss.com/docs/guides/vite
- https://react.dev/learn/start-a-new-react-project
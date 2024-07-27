# Svelte For Chads

Just a simple template which I put all my tools that I build in it for fast development.

## Run Develop Server

```bash
cp .env.example .env
npm install
npm run dev
# Or run this if you want to host it in development environment
npm run dev-host
```

## Build

```bash
npm run build
```

A folder called [build](./build) gets created and inside it are all files that you need to host your project with nginx.

## Host

```bash
sudo python3 build.py
```

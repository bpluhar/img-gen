# Avatar Generator API

A Next.js project providing dynamic avatar generation through a simple API endpoint.

## API Endpoints

### Avatar Generation
`POST /api/avatar`

Generate custom avatars with the following parameters:

| Parameter  | Required | Default | Description                                    |
|------------|----------|---------|------------------------------------------------|
| img-size   | Yes      | -       | Image size (1-1000px)                         |
| bg-color   | No       | Random  | Background color (Tailwind colors supported)   |
| fg-color   | No       | white   | Foreground/text color                         |
| font-size  | No       | md      | Text size                                     |
| chars      | No       | ""      | Characters to display                         |
| rounded    | No       | false   | Whether to round the avatar corners           |

#### Color Support
- Basic colors: red, blue, green, yellow, purple, orange, pink, brown, gray, black, white
- Tailwind color variants: Must use numbers divisible by 50 (e.g., red-500)

#### Example Usage
`curl -X POST -F "img-size=64" -F "bg-color=blue-500" -F "chars=AB" https://ez-avatar.vercel.app/api/avatar`

## Development

1. Install dependencies:
bash
npm install
or
yarn install
or
pnpm install
or
bun install

2. Run the development server:

npm run dev
or
yarn dev
or
pnpm dev
or
bun dev


3. Open [http://localhost:3000](http://localhost:3000) to view the application

## Features

- Dynamic avatar generation
- Customizable sizes (1-1000px)
- Tailwind CSS color support
- Custom text support
- Rounded corner option
- WebP image format
- Built-in caching (1 year cache duration)

## Technologies

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com)

## Deployment

Deploy easily with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo-name)

## License

MIT License - Feel free to use this project for personal or commercial purposes.
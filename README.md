# CrewAI UI

A modern Next.js UI application for interacting with CrewAI services. This application provides a clean, responsive interface for generating scenarios and displaying AI-generated results.

## Features

- **Clean UI Design**: Minimalist interface with purple-themed styling
- **Multiline Input**: 5-line textarea for scenario input with dark blue text
- **API Integration**: Connects to backend server at `http://localhost:8000/run`
- **Keyboard Support**: Press Enter to submit (Shift+Enter for new line)
- **Responsive Design**: Optimized for desktop and mobile devices
- **Scrollable Output**: Results displayed in a scrollable container with custom scrollbar
- **Real-time Feedback**: Loading states and error handling

## Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun
- Docker (optional, for containerized deployment)
- Backend API server running at `http://localhost:8000`

## Getting Started

### Development

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

## Docker

### Quick Start with Docker

1. **Build the Docker image:**
   ```bash
   docker build -t crewai-ui .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:3000 crewai-ui
   ```

3. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Commands

**Build the image:**
```bash
docker build -t crewai-ui .
```

**Run the container:**
```bash
docker run -p 3000:3000 crewai-ui
```

**Run in detached mode (background):**
```bash
docker run -d -p 3000:3000 --name crewai-ui crewai-ui
```

**Stop the container:**
```bash
docker stop crewai-ui
```

**Remove the container:**
```bash
docker rm crewai-ui
```

**View running containers:**
```bash
docker ps
```

**View container logs:**
```bash
docker logs crewai-ui
```

### Docker Features

- Multi-stage build for optimized image size
- Runs as non-root user for security
- Uses Node.js 20 Alpine for minimal footprint
- Standalone output mode for faster builds

## API Integration

The application expects a backend API server running at `http://localhost:8000/run` that accepts POST requests with the following format:

```json
{
  "topic": "Your scenario text",
  "current_year": "2025"
}
```

The API should return a JSON response with a `result` property:

```json
{
  "result": "Generated content here"
}
```

## Usage

1. Type your scenario in the multiline textarea
2. Press **Enter** to submit (or click the Generate button)
3. Use **Shift+Enter** to create a new line in the textarea
4. View the results in the scrollable output section below

## Project Structure

```
/ui
├── src/
│   └── app/
│       ├── page.tsx          # Main page component
│       ├── page.module.css   # Component styles
│       ├── layout.tsx        # App layout
│       └── globals.css       # Global styles
├── public/                   # Static assets
├── Dockerfile               # Docker configuration
├── .dockerignore            # Docker ignore file
├── next.config.ts           # Next.js configuration
└── package.json             # Dependencies
```

## Technologies

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **CSS Modules**: Scoped styling

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

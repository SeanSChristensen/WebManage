# WebManage

A web-based system manager for Windows built with React, TypeScript, and ASP.NET Core. View running applications, monitor CPU and RAM usage, end tasks, and control per-application volume from the browser.

## Screenshots
![WebManage](./app%20screenshot.png)

## Features

* **Task list** – Windowed processes with live CPU and RAM usage, refreshed every 10 seconds
* **Sorting** – Click the Name, CPU Usage, or RAM Usage headers to sort the task list
* **End task** – Kill a running process by its ID
* **System usage** – Overall CPU and RAM usage percentages
* **Volume mixer** – Per-application volume sliders for active audio sessions
* **Drive info** – API endpoint reporting total and free space for each storage drive

## Technologies

### Frontend

* **React** – Component-based user interface
* **Vite** – Frontend build tool and development server
* **TypeScript** – Typed frontend development
* **ESLint** – Code linting and quality

### Backend

* **ASP.NET Core (.NET 8)** – Minimal API web server
* **C#** – Server-side development
* **System.Diagnostics** – Process listing, CPU/RAM sampling, and ending tasks
* **PerformanceCounter** – Overall CPU usage
* **NAudio** – Windows Core Audio access for per-application volume control
* **CORS** – Cross-origin resource sharing
* **SPA Proxy** – Launches the Vite dev server alongside the backend

## Architecture

```text
React + Vite
     │
     │ HTTP / REST API
     ▼
ASP.NET Core Minimal API ───────┬──────────────► Processes (System.Diagnostics)
                                │
                                ├──────────────► CPU / RAM (PerformanceCounter, ComputerInfo)
                                │
                                ├──────────────► Audio sessions (NAudio / Core Audio)
                                │
                                └──────────────► Storage drives (DriveInfo)
```

## API Endpoints

| Endpoint | Description |
| --- | --- |
| `GET /getprocesses` | All running processes with CPU and RAM usage |
| `GET /getwindowedprocesses` | Only processes that have a window |
| `GET /end/{id}` | End the process with the given ID |
| `GET /cpu` | Overall CPU usage (%) |
| `GET /ram` | Overall RAM usage (%) |
| `GET /sounds` | Active audio sessions (process ID and name) |
| `GET /sounds/{programID}/{volume}` | Set an application's volume (0–100) |
| `GET /driveInfo` | Total and free space for each drive (GB) |

## Project Structure

```text
├── WebManage.Server/        # ASP.NET Core backend
│   ├── Features/            # Process, volume, and drive models/logic
│   ├── Properties/          # Launch settings
│   └── Program.cs           # API endpoints
├── webmanage.client/        # React frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # TaskView, VolumeView
│   │   ├── service/         # API calls
│   │   └── types/           # Task and Volume types, sorting
│   ├── package.json
│   └── vite.config.ts
└── WebManage.slnx           # Visual Studio solution
```

## Running Locally

Requires Windows, the .NET 8 SDK, and Node.js.

```bash
cd webmanage.client
npm install
cd ../WebManage.Server
dotnet run
```

The backend runs on `http://localhost:5222` and the SPA proxy starts the Vite dev server on `https://localhost:60919`. You can also open `WebManage.slnx` in Visual Studio and run it from there.

## Overview

This project of mine developed my understanding of the below:

* React frontend development with TypeScript
* REST API development with ASP.NET Core minimal APIs
* Reading system information (processes, CPU, RAM, drives) in C#
* Windows audio session control with NAudio
* Polling an API to keep the UI up to date
* Client-side sorting and state management with React hooks
* Client-server communication
* Git-based development

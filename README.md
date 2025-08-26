![GitHub tag](https://img.shields.io/github/v/tag/go-dima/raycast-jenkins?label=version)

# Jenkins Commander

A comprehensive Raycast extension for Jenkins integration that provides powerful job management and monitoring capabilities.

## Commands

### View Jobs

Browse and interact with Jenkins jobs in a hierarchical structure. Navigate through folders, view job details, trigger builds, and manage favorites. Features include:

- Hierarchical job browsing (folders → jobs → builds)
- Parameterized build execution with dynamic forms
- Favorites system with ⭐ indicators
- Build status monitoring

### Jenkins Jobs Progress

Menu bar widget that tracks progress of user-initiated builds. Shows building (🔄), success (✅), and failure (❌) indicators with automatic cleanup of completed jobs.

### Search Jenkins

Global search across all Jenkins jobs using built-in API.

## Features

- **Hierarchical Browsing**: Navigate complex Jenkins folder structures
- **Parameterized Builds**: Dynamic form generation for job parameters (String, Boolean, Choice)
- **Global Search**: Fast job discovery
- **Favorites Management**: Add/remove jobs from favorites with dedicated sections
- **Build Monitoring**: Live build status updates and progress tracking
- **Menu Bar Integration**: Persistent build progress monitoring
- **Smart Sorting**: Usage-based job ordering with favorites prioritized
- **Keyboard Shortcuts**: `Cmd+Shift+F` (toggle favorites), `Cmd+B` (build), `Cmd+R` (refresh)
- **Auto-cleanup**: Automatic removal of completed or deleted builds

## Author

[Dima Go](https://github.com/go-dima)

## License

[MIT](./LICENSE)

# Shards
![Changing strings with replacement in Shards](https://github.com/user-attachments/assets/8b258860-febe-4bfb-be5d-f51916521753)
shards, the file name management tool

## Development Setup

1. Run the server with `npm start`

## Architecture

This application follows a hybrid architecture where the frontend handles all preview-related transformations and selections, while the backend (Electron main process) is only responsible for final file system operations like renaming or deleting files.

The central motivation for this architecture is user experience and performance. Most operations in the app are non-destructive previews. The user interacts with filenames, modifies display values, tests different transformations, and selects files – but nothing is actually changed on disk until the user explicitly confirms their intention.
By keeping all preview logic on the frontend (Angular), we ensure:
- Responsiveness: UI interactions are instant, even with large file sets.
- Isolation: Preview logic is decoupled from file system logic.
- Clarity: The backend only deals with concrete actions, not temporary states.

### Advantages
- Performance: No IPC overhead for UI-only interactions like selection toggling or visual name changes.
- User Experience: Real-time feedback without delays or backend round-trips.
- Clean separation of concerns:
- Frontend = UI state & transformation preview
- Backend = actual file operations
- Safer development & testing: Since no files are touched during preview, users can safely experiment.

### Drawbacks
- More frontend logic: Requires well-structured state management in Angular.
- Complexity in syncing: If you ever want to persist selections across sessions, you’ll need to implement syncing logic.

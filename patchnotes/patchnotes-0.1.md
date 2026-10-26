# Patch notes 0.1

Bug-fix release. No new features and no API changes. The frontend still talks to the same backend endpoints.

## Fixes

### Game page
- **Opening `/game` directly no longer crashes.** If you refresh the page or open `/game` without choosing players first, you now go back to player selection instead of getting a blank page and a browser alert.
- **Games can't be saved twice.** The "Sla op" button is disabled and shows "Opslaan..." while the game is saving, so a double tap no longer creates a duplicate game.
- **Saving errors are shown.** If saving fails, the page now shows "Opslaan mislukt, probeer het opnieuw" and you can try again. Before, nothing happened.

### Adding a player
- **The add-player form shows errors.** An invalid or duplicate name now shows "Ongeldige naam of speler bestaat al" in the dialog. Other errors show "Toevoegen mislukt, probeer het opnieuw". Before, the dialog just stayed open without saying anything.
- The player list is now sorted on a copy instead of changing the list in place.

### Month picker (leaderboard)
- **The selected month now matches the page.** After a refresh on, for example, `/2025-03`, the dropdown used to jump to the latest month. It now shows the month in the URL, and the current month when the URL has none.
- The current month is in the list even when no games have been played yet this month.
- Fixed a React hook-order problem (a `useState` call after an early return).

### Sessions and errors
- **An expired session takes you to the login page.** If refreshing the session fails, you're sent to `/login` instead of seeing an error screen.
- **New error page.** Errors that happen while loading a page now show a short Dutch message ("Er ging iets mis" / "Niet gevonden") with a link back to the leaderboard. The header stays visible.

### Other
- **Player names with special characters work.** Names with spaces, `/`, `?` or `#` are now URL-encoded, both in links to a player's page and in the request for their games.
- **Logout uses the right URL.** `logout()` now uses the same request helper as everything else, so it gets the `/api/` prefix and the correct base URL. Nothing in the UI calls it yet.

## For developers
- `apiFetch` now throws an `ApiError` (with a `status` field) whenever a request fails. When the session can't be refreshed, it throws React Router's `redirect("/login")` instead of a plain `Error`. In event handlers, check `err instanceof Response` to catch that case.
- Removed the `res.ok` checks in `api/leaderboard.ts` and the loaders. `apiFetch` already throws when a request fails, so those checks never ran.
- New file: `src/pages/ErrorPage.tsx`. It's attached as `errorElement` on a pathless child route in `main.tsx`, so errors render inside `Layout`.

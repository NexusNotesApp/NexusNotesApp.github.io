# Website validation — October 11, 2026 (America/Chicago)

This is a separate website release, not a new Nexus desktop application version.

* Published to https://nexusnotesapp.github.io/ from the dedicated website repository.
* Initial GitHub Pages deployment succeeded (workflow run 38175293537).
* Homepage, account, downloads, privacy, logo and vendored SDK returned HTTP 200.
* Three automated test groups passed in Chrome/Node on Windows: release selection,
  local links/JavaScript syntax, and browser flows. Browser checks cover desktop
  and 390px mobile layouts, all four product preview tabs, AI writing examples,
  unauthenticated download gating, signup confirmation destination, failed login,
  password-reset request, authenticated downloads and release API failures.
* Browser auth flows use mocks. No real account was created or email sent.
* Supabase's public settings endpoint responded successfully. Email sign-in and
  registration are enabled; email confirmation is required.
* Owner must configure/verify Supabase redirect URLs and email delivery before
  end-to-end signup testing. SMTP and redirect settings cannot be inspected or
  updated using the browser publishable key.
* The download gate does not make the public GitHub installer assets private.
* No desktop application source, local notes, user database or installer was changed.

Run browser tests with `node --test tests/website.test.cjs` from this repository.
Node 22+ and Chrome are required. Set CHROME_PATH if Chrome is installed elsewhere.
Browser screenshots are written to the system temporary folder.

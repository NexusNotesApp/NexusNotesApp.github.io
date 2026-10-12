# Website validation — October 11, 2026 (America/Chicago)

October 12, 2026: signup account links now display the noninteractive prompt
“Already have an account?” followed by an underlined “Log in” action. “Forgot
password?” is on its own line below. Login/reset mode controls retain their
existing behavior. Account-page CSS/auth script URLs include a cache version so
the markup and script deploy together. Three existing Node/Chrome test groups
passed with mocked authentication, including additional desktop/mobile layout
checks and screenshots. No real accounts, email, saved sessions, desktop data or
database schema were changed.

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

October 11 update: removed the model-space estimate from the FAQ and the dynamic
installer-size display from authenticated downloads. Added a releases.js cache
version. All three existing website test groups passed, including Chrome browser
flows. Desktop automatic/manual Ollama setup is a separate source change.

October 11 update: added Tables and Code product preview tabs immediately after
Notes, which remains the initial selection. Tables includes an example and
instructions for `/table`, cell navigation, row/column menus and formatting.
Code includes a highlighted JavaScript example and instructions for `/code`,
automatic language detection, the language selector, indentation and copying.
Descriptions were checked against the installed Nexus editor implementation.
All three website test groups passed in Chrome/Node, including the six-tab order,
initial Notes selection, new content, keyboard navigation and mobile overflow.
This changes the website only; it does not produce a desktop application build.

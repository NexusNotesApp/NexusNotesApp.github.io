# Website validation — October 11, 2026 (America/Chicago)

October 12, 2026: signup account links now display the noninteractive prompt
“Already have an account?” followed by an underlined “Log in” action. “Forgot
password?” is on its own line below. Login/reset mode controls retain their
existing behavior. Account-page CSS/auth script URLs include a cache version so
the markup and script deploy together. Three existing Node/Chrome test groups
passed with mocked authentication, including additional desktop/mobile layout
checks and screenshots. No real accounts, email, saved sessions, desktop data or
database schema were changed. Source is mirrored in the dedicated public website
checkout for publication; deployment verification is recorded with the task.

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

October 12 update: added a homepage FAQ explaining automatic CSV/tab-separated
table paste, first-row headers, quoted commas, blank cells and plain-text paste.
Local copy only; not published. Publish this FAQ alongside a verified release
containing CSV support. The initial automatic approval-review usage block cleared:
41 focused Flutter tests, five-file analysis and the Windows v1.0.68 release build
passed. Production packaging/evidence is recorded in the desktop version history.
No browser suite was rerun for this copy-only change; diff checks passed. The
website was not published and public release assets were not uploaded here.


October 13, 2026 (America/Chicago): website authentication switched to Firebase
project nexus-notes-9f146. Registration, verification resend, verified-email
login/download gating, session restoration, logout, password reset requests and
custom verification/reset action handling are implemented. Firebase App/Auth
compat SDK 13.0.0 are served locally; Analytics is not loaded.

Three Node/Chrome test groups passed on Windows with mocked Firebase, including
signup verification destination, failed login, resend, reset completion,
verification completion, expired reset links, unverified download blocking,
verified downloads, release errors and desktop/mobile layouts. No real account
was created or email sent. Actual Mac browser runtime and company-network flows
remain unverified. Console authorized domains, Email/Password enablement,
templates and real email delivery require acceptance testing.

The owner's sole Supabase test account is not migrated or deleted; register a
fresh Firebase account and request fresh links. Desktop application versions,
local databases, notes, attachments, storage paths and backups are unchanged.
This is a website change only. Existing Supabase sessions no longer grant website
access after publication. Rollback restores the previous website/provider;
new Firebase accounts would need separate handling. Public installers remain
public on GitHub. Publication status is recorded below when verified.

Firebase public project configuration returned HTTP 200 and confirmed
nexus-notes.net is authorized (localhost is also present). The actual website
uses the preserved CNAME nexus-notes.net. Email/Password provider enablement
and real email delivery are not established by this read-only check.


October 14, 2026 (America/Chicago): added Continue with Google alongside email/password login and account creation. Existing verification, reset and verified download gating remain. Google is hidden during password reset. Three Node/Chrome test groups passed with mocked authentication, including Google success, unverified-account gating, blocked popups and disabled-provider errors. Read-only Firebase checks confirmed project number 618833204591, authorized nexus-notes.net, and an HTTP 200 Google authorization URI response. No real Google account was signed in, created or changed. Real Google popup completion and Mac browser acceptance remain pending. No desktop data, app versions or existing Firebase accounts changed.

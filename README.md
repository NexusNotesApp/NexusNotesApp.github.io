# Nexus Notes test website

Static GitHub Pages site for https://nexusnotesapp.github.io/.
Publish the contents of this directory as the root of the separate public
`NexusNotesApp/NexusNotesApp.github.io` repository. Do not publish the desktop
source repository. The included workflow deploys on pushes to `main`.

## Hosting setup

1. Create the public repository `NexusNotesApp.github.io` in the NexusNotesApp organization.
2. Push this directory's contents to that repository's `main` branch.
3. In that repository, Settings → Pages → Build and deployment → Source:
   select **GitHub Actions**. Run the Publish Nexus Notes website workflow.
4. In Supabase project `jdujgubrrdsibqahnviz`, Authentication → URL Configuration:
   set Site URL to `https://nexusnotesapp.github.io/` and add these Redirect URLs:
   * `https://nexusnotesapp.github.io/downloads.html`
   * `https://nexusnotesapp.github.io/account.html`
5. Keep email/password sign-in and email confirmation enabled. In the Confirm
   signup email template keep `{{ .ConfirmationURL }}` as the confirmation link.
   The website passes downloads.html as the post-confirmation destination.
6. Configure Authentication → Email → SMTP with an email provider before public
   registration testing. Supabase's default mail service only sends to project
   team email addresses and has a low rate limit. See
   https://supabase.com/docs/guides/auth/auth-smtp.
7. Test real sign-up, confirmation, sign-in, sign-out and password recovery with
   an email address you control. Email delivery and dashboard configuration
   cannot be verified using the public publishable key alone.

## Configuration and privacy

`config.js` contains the public Supabase URL and publishable key supplied by the
owner. These are intentionally browser-visible. No secret or service-role key
is needed. Variables in Nexus_Releases are in a different repository; this
static site does not read them. Update config.js if the public configuration changes.

Download links are only rendered after Supabase `getUser()` verifies a session.
This is a website login gate, not private file hosting: GitHub release assets
remain public. Use private object storage with server-enforced access policies
if the installers themselves must become private.

Windows and Mac releases are selected independently by numeric asset version,
excluding draft/prerelease releases. `MacOS_v1.0.55` and `Windows_v1.0.55` tags
are supported. The GitHub API is queried when the signed-in page opens; API
errors show a retry action rather than a misleading empty download list.

The account is for this website; it does not sync desktop notes or create a
desktop workspace. The website includes no analytics. Google Fonts, GitHub,
and Supabase receive normal browser requests as described in privacy.html.

## Local preview

Serve this directory with any static HTTP server, then open index.html. Use
HTTP on localhost for preview and HTTPS on the published site. Do not test
authentication from file:// URLs. Local auth testing also requires adding the
specific localhost callback URLs to Supabase's redirect allowlist.

The test runner in `tests/website.test.cjs` uses Node 22+ and Chrome to serve
and inspect desktop/mobile pages, login gating, mocked auth flows, release
selection and error handling. It never creates a real user or sends email.

Supabase browser SDK: vendored @supabase/supabase-js 2.49.1, MIT license.
Source: https://github.com/supabase/supabase-js.

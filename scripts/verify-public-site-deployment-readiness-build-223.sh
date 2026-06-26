#!/usr/bin/env bash
set -euo pipefail

# Build 223 — Public Site Deployment Readiness Verifier (read-only)
# Confirms required public static paths exist, that navigation between the
# homepage and the sample demo surface is bidirectional, that basic
# metadata/static-hosting files are present, and that the sales-demo
# safe-copy guardrails (sample/demo, synthetic, manual-approval pilot,
# no autonomous/homeowner contact) are preserved.
# It performs NO live action: no send, no provider call, no credential load,
# no network. Pure local file inspection.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

WEB="website"
HOME_HTML="$WEB/index.html"
DEMO_HTML="$WEB/demo/sales-demo.html"
NOTFOUND="$WEB/404.html"
ROBOTS="$WEB/robots.txt"
SITEMAP="$WEB/sitemap.xml"

FAILURES=0
pass() { echo "PASS: $1"; }
fail() { echo "FAIL: $1" >&2; FAILURES=$((FAILURES + 1)); }

echo "=== Build 223 Public Site Deployment Readiness (read-only) ==="

# 1) Required public paths exist
for f in "$HOME_HTML" "$DEMO_HTML" "$NOTFOUND" "$ROBOTS" "$SITEMAP"; do
  if [ -f "$f" ]; then pass "public path exists: $f"; else fail "missing public path: $f"; fi
done

# 2) Bidirectional navigation between homepage and demo surface
if grep -q 'demo/sales-demo.html' "$HOME_HTML"; then
  pass "homepage links to demo surface (demo/sales-demo.html)"
else
  fail "homepage does not link to demo/sales-demo.html"
fi
if grep -q '../index.html' "$DEMO_HTML"; then
  pass "demo surface links back to homepage (../index.html)"
else
  fail "demo surface does not link back to homepage"
fi

# 3) Metadata / static-hosting essentials on the demo surface
grep -q 'rel="icon"' "$DEMO_HTML" && pass "demo surface has favicon link" || fail "demo surface missing favicon link"
grep -q 'name="description"' "$DEMO_HTML" && pass "demo surface has meta description" || fail "demo surface missing meta description"
grep -q 'property="og:title"' "$DEMO_HTML" && pass "demo surface has open graph title" || fail "demo surface missing og:title"
grep -qi 'noindex' "$DEMO_HTML" && pass "demo surface is noindex (sample surface kept out of search index)" || fail "demo surface not marked noindex"

# 4) Homepage metadata preserved
grep -q 'property="og:title"' "$HOME_HTML" && pass "homepage open graph title preserved" || fail "homepage og:title missing"
grep -q 'rel="icon"' "$HOME_HTML" && pass "homepage favicon preserved" || fail "homepage favicon missing"

# 5) robots.txt + sitemap sanity
grep -qi 'Sitemap:' "$ROBOTS" && pass "robots.txt references sitemap" || fail "robots.txt missing Sitemap reference"
grep -qi 'Disallow: /demo/' "$ROBOTS" && pass "robots.txt disallows /demo/ (sample surface not indexed)" || fail "robots.txt does not disallow /demo/"
grep -q '<urlset' "$SITEMAP" && pass "sitemap.xml is a urlset" || fail "sitemap.xml malformed"

# 6) Safe-copy guardrails preserved on the demo surface
declare -a GUARDRAILS=(
  "SAMPLE / DEMO"
  "synthetic data only"
  "Manual approval pilot first"
  "No autonomous customer contact"
  "No homeowner outreach without consent and separate approval"
)
for g in "${GUARDRAILS[@]}"; do
  if grep -qF "$g" "$DEMO_HTML"; then
    pass "guardrail copy preserved: \"$g\""
  else
    fail "guardrail copy missing: \"$g\""
  fi
done

# 7) Approved pricing/positioning preserved on the demo surface
grep -qF '$399-$799/mo + $499 setup' "$DEMO_HTML" && pass "approved pricing preserved" || fail "approved pricing missing/altered"
grep -qF '14-day trial' "$DEMO_HTML" && pass "14-day trial language preserved" || fail "14-day trial language missing"

# 8) Forbidden / overreach marketing terms must NOT appear in public pages
FORBIDDEN_HITS=0
while IFS= read -r line; do
  echo "FAIL: forbidden/overreach term in public copy: $line" >&2
  FORBIDDEN_HITS=$((FORBIDDEN_HITS + 1))
done < <(grep -rniE 'guarantee|booked job|jobs booked|fake testimonial|automatic estimate|automatic quote|unrestricted launch is live' "$HOME_HTML" "$DEMO_HTML" "$NOTFOUND" || true)
if [ "$FORBIDDEN_HITS" -eq 0 ]; then
  pass "no forbidden/overreach marketing terms in public pages"
else
  FAILURES=$((FAILURES + 1))
fi

# 9) No sensitive values introduced (phone / Twilio SID / Vapi-style key).
#    Company public support email is permitted and not a destination/contact value.
SENSITIVE="$(grep -rEoh '(\+?1?[ .-]?\(?[0-9]{3}\)?[ .-]?[0-9]{3}[ .-]?[0-9]{4})|(AC[0-9a-fA-F]{32})|(SK[0-9a-fA-F]{32})' "$HOME_HTML" "$DEMO_HTML" "$NOTFOUND" "$ROBOTS" "$SITEMAP" 2>/dev/null || true)"
if [ -z "$SENSITIVE" ]; then
  pass "no phone-number / raw-SID / secret-shaped values in public files"
else
  fail "sensitive-shaped value(s) found in public files: $SENSITIVE"
fi

echo ""
if [ "$FAILURES" -gt 0 ]; then
  echo "FAIL: Build 223 public site deployment readiness failed ($FAILURES check(s))." >&2
  exit 1
fi
echo "PASS: Build 223 public site deployment readiness verifier passed (read-only; no send)."

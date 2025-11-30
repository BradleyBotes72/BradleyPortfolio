# DNS Configuration for bradleybotes.co.za
## Complete DNS Setup Guide for GitHub Pages

---

## 📋 Required DNS Records

### For Main Domain (bradleybotes.co.za)

Add these **4 A Records** pointing to GitHub Pages servers:

| Type | Name/Host | Value/Points To    | TTL  | Priority |
|------|-----------|-------------------|------|----------|
| A    | @         | 185.199.108.153   | 3600 | -        |
| A    | @         | 185.199.109.153   | 3600 | -        |
| A    | @         | 185.199.110.153   | 3600 | -        |
| A    | @         | 185.199.111.153   | 3600 | -        |

**Plus add WWW subdomain:**

| Type  | Name/Host | Value/Points To           | TTL  | Priority |
|-------|-----------|--------------------------|------|----------|
| CNAME | www       | YOUR_USERNAME.github.io  | 3600 | -        |

> Replace `YOUR_USERNAME` with your actual GitHub username

---

## 🌍 Provider-Specific Instructions

### Cloudflare

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Select domain: **bradleybotes.co.za**
3. Click **DNS** in left menu
4. Click **+ Add record** for each record:

**A Records (add 4 times):**
- Type: `A`
- Name: `@`
- IPv4 address: (use each IP above, one at a time)
- Proxy status: **Proxied** (orange cloud) ← Important for Cloudflare security
- TTL: Auto

**CNAME Record:**
- Type: `CNAME`
- Name: `www`
- Target: `YOUR_USERNAME.github.io`
- Proxy status: **Proxied** (orange cloud)
- TTL: Auto

5. Click **Save** for each record

**Cloudflare Special Notes:**
- Proxied (orange cloud) provides DDoS protection and CDN
- If site doesn't work, try **DNS only** (grey cloud) temporarily
- SSL/TLS mode: Set to **Full** in SSL/TLS tab

---

### GoDaddy

1. Log in to [godaddy.com](https://www.godaddy.com)
2. Go to **My Products** → **DNS** (next to your domain)
3. Scroll to DNS Records section

**A Records (add 4 times):**
- Click **Add** (for each record)
- Type: `A`
- Name: `@`
- Value: (use each GitHub IP)
- TTL: 1 Hour (3600 seconds)

**CNAME Record:**
- Click **Add**
- Type: `CNAME`
- Name: `www`
- Value: `YOUR_USERNAME.github.io` (no trailing dot needed)
- TTL: 1 Hour

4. Click **Save** for each record

**Delete conflicting records:**
- If you see existing A records pointing elsewhere, delete them
- If you see a CNAME record for `@`, delete it (can't have both A and CNAME for @)

---

### Namecheap

1. Log in to [namecheap.com](https://www.namecheap.com)
2. Go to **Domain List**
3. Click **Manage** next to bradleybotes.co.za
4. Go to **Advanced DNS** tab

**A Records (add 4 times):**
- Click **Add New Record**
- Type: `A Record`
- Host: `@`
- Value: (each GitHub IP address)
- TTL: Automatic (or 3600)

**CNAME Record:**
- Click **Add New Record**
- Type: `CNAME Record`
- Host: `www`
- Value: `YOUR_USERNAME.github.io.` (note the trailing dot!)
- TTL: Automatic

5. Click green checkmark ✓ to save each record

**Remove parking page:**
- Delete any existing URL Redirect records for `@` and `www`

---

### IONOS (1&1)

1. Log in to [ionos.com](https://www.ionos.com)
2. Go to **Domains & SSL**
3. Click domain → **DNS** settings

**A Records:**
- Click **Add Record**
- Type: `A`
- Hostname: (leave empty or use `@`)
- Points to: (each GitHub IP)
- Add all 4

**CNAME:**
- Click **Add Record**
- Type: `CNAME`
- Hostname: `www`
- Points to: `YOUR_USERNAME.github.io`

---

### Bluehost / HostGator (cPanel)

1. Log in to **cPanel**
2. Find **Zone Editor** (under Domains section)
3. Click **Manage** next to your domain

**A Records:**
- Click **+ A Record**
- Name: `@` or your domain
- Address: (each GitHub IP)
- Add all 4 records

**CNAME:**
- Click **+ CNAME Record**
- Name: `www`
- CNAME: `YOUR_USERNAME.github.io`

---

### Google Domains (Now Squarespace Domains)

1. Log in to [domains.google.com](https://domains.google.com) or Squarespace
2. Select your domain
3. Click **DNS** in left menu

**Custom Records:**

**A Records:**
- Host name: `@`
- Type: `A`
- TTL: 1 hour
- Data: (add each GitHub IP - you can add multiple in one A record)

**CNAME:**
- Host name: `www`
- Type: `CNAME`
- TTL: 1 hour
- Data: `YOUR_USERNAME.github.io`

---

### Other Providers

**General DNS Management:**
1. Find DNS management section (usually called):
   - DNS Settings
   - DNS Management
   - Name Servers
   - Zone Editor
   - DNS Records

2. Add the records as shown in the table at the top

3. Common field names:
   - **Type**: Record type (A, CNAME)
   - **Name/Host**: @ for root domain, www for subdomain
   - **Value/Data/Points To**: IP address or domain
   - **TTL**: Usually 3600 (1 hour) or Auto

---

## ✅ Verification Steps

### 1. Check DNS Propagation (15-60 mins after setup)

Use these tools:
- **What's My DNS**: [whatsmydns.net](https://www.whatsmydns.net/)
  - Enter: `bradleybotes.co.za`
  - Select: `A` record type
  - Should show GitHub IPs around the world (green checkmarks)

- **DNS Checker**: [dnschecker.org](https://dnschecker.org/)
  - Enter your domain
  - Check both A and CNAME records

### 2. Test in Browser

```
# Try these URLs:
http://bradleybotes.co.za          # Should redirect to HTTPS
https://bradleybotes.co.za         # Should load your site
http://www.bradleybotes.co.za      # Should redirect to HTTPS
https://www.bradleybotes.co.za     # Should load your site
```

### 3. Command Line Verification (PowerShell)

```powershell
# Check A records
nslookup bradleybotes.co.za

# Should show GitHub IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check CNAME record
nslookup www.bradleybotes.co.za

# Should show: YOUR_USERNAME.github.io
```

---

## ⏱️ DNS Propagation Timeline

| Time      | What to Expect |
|-----------|----------------|
| 0-5 mins  | Changes saved at registrar |
| 5-15 mins | Local DNS servers start updating |
| 15-30 mins| Most DNS servers have new records |
| 30-60 mins| Global propagation mostly complete |
| 1-24 hrs  | Complete global propagation |
| Up to 48 hrs | Maximum time in rare cases |

**Tip:** DNS changes are usually visible in 15-30 minutes for most users.

---

## 🔒 Enable HTTPS (After DNS Propagates)

1. Go to GitHub repo → **Settings** → **Pages**
2. Verify custom domain shows: `bradleybotes.co.za` with ✓
3. Wait for **"Enforce HTTPS"** checkbox to appear (15-30 mins)
4. Check the box: ☑ **Enforce HTTPS**
5. Your site now has SSL certificate! 🔒

**If HTTPS option doesn't appear:**
- Wait longer (try 30 mins)
- Verify DNS propagated: [whatsmydns.net](https://www.whatsmydns.net/)
- Try removing and re-adding custom domain
- Clear browser cache and retry

---

## 🐛 Common DNS Issues

### Issue: "Domain is improperly configured"

**Cause:** DNS records not set up or not propagated yet

**Fix:**
1. Double-check all DNS records match exactly
2. Wait 30-60 minutes
3. Clear browser cache: `Ctrl + F5`
4. Try incognito/private browsing mode

### Issue: "CNAME already exists"

**Cause:** Can't have both A and CNAME records for same host

**Fix:**
- For `@` (root): Use **A records only** (4 of them)
- For `www`: Use **CNAME only**
- Delete any conflicting records

### Issue: Subdomain works but root doesn't (or vice versa)

**Cause:** One record type is missing

**Fix:**
- Ensure A records exist for `@` (root domain)
- Ensure CNAME exists for `www`
- Both should be configured

### Issue: DNS points to parking page

**Cause:** Old DNS records or redirects

**Fix:**
- Remove any URL Redirect records
- Remove any domain forwarding
- Delete old A records pointing to parking IPs

### Issue: "Too many redirects" error

**Cause:** Usually Cloudflare SSL/TLS mismatch

**Fix (Cloudflare users):**
1. Go to SSL/TLS tab
2. Set SSL/TLS encryption mode to **Full**
3. Clear browser cache
4. Wait 5 minutes and retry

---

## 📊 DNS Record Summary

**What you need:**

```
✅ 4 A Records (@ host)    → GitHub Pages IPs
✅ 1 CNAME Record (www)    → YOUR_USERNAME.github.io
✅ 1 CNAME file (in repo)  → bradleybotes.co.za
```

**What you DON'T need:**

```
❌ AAAA records (IPv6) - optional but not required
❌ TXT records - GitHub doesn't require them
❌ MX records - unless you use email on this domain
❌ URL redirects - DNS should handle it
```

---

## 📧 Email Configuration (Optional)

**If you want email@bradleybotes.co.za:**

You'll need:
- Email hosting service (Google Workspace, Zoho, etc.)
- MX records from your email provider

**Important:** Website (A/CNAME) and email (MX) records work independently.
You can have your website on GitHub and email elsewhere.

---

## 🔗 Quick Reference Links

- **GitHub Pages Custom Domain Docs**:
  https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

- **GitHub IP Addresses** (official):
  https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain

- **DNS Propagation Checker**:
  https://www.whatsmydns.net/

- **SSL Certificate Checker**:
  https://www.ssllabs.com/ssltest/

---

## ✨ Success Criteria

Your DNS is correctly configured when:

- ✅ `nslookup bradleybotes.co.za` shows GitHub IPs
- ✅ `nslookup www.bradleybotes.co.za` shows your GitHub Pages domain
- ✅ Website loads at both bradleybotes.co.za and www.bradleybotes.co.za
- ✅ HTTPS works (green padlock in browser)
- ✅ No certificate warnings
- ✅ Site loads in incognito mode

---

**Need Help?** Check the main guide: `GITHUB_PAGES_SETUP.md`

**Happy DNS Configuration! 🌐**


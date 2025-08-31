# OAuth‑From‑Scratch

**OAuth 2.0 implementation in Node.js from scratch**  
No use of Passport, googleapis, or other OAuth client libraries.

## Features

- Full OAuth 2.0 Authorization Code Grant flow.
- Custom implementation of:
  - Authorization request
  - Callback handling
  - Token exchange
- Lightweight and dependency-minimal approach.
- Designed for educational purposes and deep understanding of OAuth.   |

## Learning Outcomes

- Solid grasp of OAuth 2.0 Authorization Code flow.
- Experience with HTTP redirects, query parameters, and token exchange.
- Foundation to extend to:
  - Refresh token flows
  - JWT handling and validation
  - State and CSRF protection
  - Integration with real identity providers

## Security Notes

- **Do not use in production without enhancements:**
  - Validate redirect URIs strictly.
  - Implement state parameter and CSRF safeguards.
  - Use HTTPS in production environments.
  - Handle token storage securely.

## Contributing

Contributions welcome! Whether it's enhancing security, supporting other grant types (e.g., PKCE or refresh tokens), improving frontend UX, or adding tests—feel free to open a PR or issue.
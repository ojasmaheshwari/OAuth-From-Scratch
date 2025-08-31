import React, { useState, useEffect } from "react";
import getGoogleOAuthURL from "../utils/getGoogleOAuthURL";
import { SERVER_URL } from "../config";
import UserProfile from "./UserProfile";

export default function GoogleLogin() {
  const [loading, setLoading] = useState(true)
  const [userFound, setUserFound] = useState(false);
  const [user, setUser] = useState({
    email: "",
    full_name: "",
    profile_picture: ""
  })

  useEffect(() => {
    fetch(`${SERVER_URL}/user`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error('Fetching user failed')
      }
    })
    .then(data => {
      setUser(data);
      setUserFound(true)
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (userFound) {
    return <UserProfile user={user}/>
  }

  return (
    <div className="container">
      <style>{`
        .container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f7fb;
        }
        .google-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border: 1px solid #dadce0;
          border-radius: 9999px; /* pill */
          background: #fff;
          font-size: 16px;
          font-weight: 600;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
          transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease;
        }
        .google-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          border-color: #c9cdd3;
        }
        .google-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .google-btn:focus-visible {
          outline: 3px solid rgba(66,133,244,0.35);
          outline-offset: 3px;
        }
        .google-icon {
          width: 18px;
          height: 18px;
          display: inline-flex;
        }
        .btn-text { color: #202124; }
      `}</style>

      <a href={getGoogleOAuthURL()}>
        <button className="google-btn" aria-label="Log in with Google">
          <span className="google-icon" aria-hidden>
            {/* Google "G" logo as inline SVG */}
            <svg viewBox="0 0 18 18" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EA4335" d="M9 7.2v3.6h5.1c-.22 1.16-1.84 3.4-5.1 3.4-3.07 0-5.6-2.53-5.6-5.6S5.93 3 9 3c1.75 0 2.92.74 3.59 1.37l2.45-2.37C13.77.78 11.6 0 9 0 4.03 0 0 4.03 0 9s4.03 9 9 9c5.2 0 8.6-3.65 8.6-8.8 0-.59-.06-1.04-.14-1.49H9z" />
              <path fill="#4285F4" d="M17.6 9.2c0-.5-.05-.98-.14-1.4H9v3h4.86c-.1.8-.78 2-2.24 2.81l2.45 1.9C16.2 13.5 17.6 11.6 17.6 9.2z" />
              <path fill="#FBBC05" d="M3.95 10.75A5.39 5.39 0 0 1 3.6 9c0-.61.11-1.2.31-1.75L1.4 5.25A8.96 8.96 0 0 0 0 9c0 1.46.35 2.84.98 4.05l2.97-2.3z" />
              <path fill="#34A853" d="M9 18c2.6 0 4.77-.86 6.06-2.35l-2.45-1.9c-.66.39-1.56.66-2.61.66-2 0-3.7-1.35-4.31-3.16l-3 .3C3.27 14.79 5.88 18 9 18z" />
            </svg>
          </span>
          <span className="btn-text">Log in with Google</span>
        </button>
      </a>
    </div>
  );
}

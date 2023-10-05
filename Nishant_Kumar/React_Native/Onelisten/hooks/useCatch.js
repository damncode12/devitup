import React from "react";
import { useEffect } from "react";
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { useState } from "react";

const useCatch = () => {

const [code, setcode] = useState("");
const clientId = '443c9eae28b147c2a3aad22d957a2fc2';
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });

const base64URLEncode = (buffer) => {
  return buffer.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const generateRandomString = async (length) => {
  const randomBytes = await Crypto.getRandomBytesAsync(length);
  return base64URLEncode(randomBytes);
};

const authEndpoint = `https://accounts.spotify.com/authorize` +
  `?response_type=code` +
  `&client_id=${encodeURIComponent(clientId)}` +
  `&redirect_uri=${encodeURIComponent(redirectUri)}` +
  `&code_challenge_method=S256`;

const handleSpotifyAuth = async () => {
  // Generate a random code verifier.
  const codeVerifier = await generateRandomString(32);

  // Calculate the code challenge from the code verifier.
  const codeChallenge = base64URLEncode(
    await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      codeVerifier
    )
  );

  // Append the code challenge to the authorization URL.
  const authorizationUrl = `${authEndpoint}&code_challenge=${codeChallenge}`;

  const result = await AuthSession.startAsync({ authUrl: authorizationUrl });
  if (result.type === 'success') {
    // Handle successful authentication.
    const { code } = result.params;
    console.log(code);
    setcode(code);
    // Exchange the code for an access token and refresh token on your server.
    // See Spotify's API documentation for details on token exchange.
  } else if (result.type === 'error') {
    // Handle authentication error.
    console.log('Authentication error:', result.errorCode);
  }
};

useEffect(()=>{
  handleSpotifyAuth();
},[])

  

  return {code}
};

export default useCatch;

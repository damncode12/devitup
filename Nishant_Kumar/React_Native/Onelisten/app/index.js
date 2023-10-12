import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useRouter } from "expo-router";
import FetchContext from "../context/FetchContext";
import { useContext } from "react";
import { useEffect } from "react";
import poster from "../asset/images/headphones.jpg";
import poster1 from "../asset/images/3988.jpg";
import * as AuthSession from "expo-auth-session";
import { Buffer } from "buffer";

const index = () => {
  const { setauthtoken } = useContext(FetchContext);
  const SPOTIFY_CLIENT_ID = "443c9eae28b147c2a3aad22d957a2fc2";
  const SPOTIFY_CLIENT_SECRET = "59748730c6384bcd839c99f34f94bf8d";
  const SPOTIFY_REDIRECT_URI = "https://auth.expo.io/@do_one/spotify";
  const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-follow-read",
    "user-follow-modify",
    "user-top-read",
    "streaming",
  ];
  const authorizationEndpoint = "https://accounts.spotify.com/authorize";
  const tokenEndpoint = "https://accounts.spotify.com/api/token";

  const handleSpotifyLogin = async () => {
    const redirectUrl = SPOTIFY_REDIRECT_URI;

    const result = await AuthSession.startAsync({
      authUrl:
        `${authorizationEndpoint}?response_type=code` +
        `&client_id=${SPOTIFY_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&scope=${encodeURIComponent(scopes.join(" "))}`,
    });

    if (result.type === "success") {
      const { code } = result.params;
      // Call the function to exchange the authorization code for an access token
      console.log(code);
      exchangeCodeForToken(code, redirectUrl);
    }
  };

  const exchangeCodeForToken = async (code, redirectUrl) => {
    const credentials = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
    const encodedCredentials = Buffer.from(credentials).toString("base64");

    const requestBody = new URLSearchParams();
    requestBody.append("grant_type", "authorization_code");
    requestBody.append("code", code);
    requestBody.append("redirect_uri", redirectUrl);

    try {
      const response = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: requestBody.toString(),
      });

      if (response.ok) {
        const { access_token, refresh_token } = await response.json();
        // Access token and refresh token can be used for Spotify API requests
        console.log("Access Token:", access_token);
        setauthtoken(access_token);
        console.log("Refresh Token:", refresh_token);
      } else {
        console.error("Failed to exchange code for token:", response.status);
      }
    } catch (error) {
      console.error("Failed to exchange code for token:", error);
    }
  };

  // const discovery = {
  //   authorizationEndpoint: "https://accounts.spotify.com/authorize",
  //   tokenEndpoint: "https://accounts.spotify.com/api/token",
  // };

  // const [request, response, promptAsync] = useAuthRequest(
  //   {
  //     responseType: ResponseType.Token,
  //     clientId: "443c9eae28b147c2a3aad22d957a2fc2",
  //     clientSecret: "59748730c6384bcd839c99f34f94bf8d",
  //     scopes: [
  //       "user-read-currently-playing",
  //       "user-read-recently-played",
  //       "user-read-playback-state",
  //       "user-top-read",
  //       "user-modify-playback-state",
  //       "streaming",
  //       "user-read-email",
  //       "user-read-private",
  //     ],
  //     // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
  //     // this must be set to false
  //     usePKCE: false,
  //     redirectUri: "https://auth.expo.io/@do_one/spotify",
  //   },
  //   discovery
  // );

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { access_token } = response.params;
  //     console.log(access_token);
  //     setauthtoken(access_token)
  //     console.log("sucessful")
  //     setTimeout(()=>{
  //       router.push("/home")
  //     },1000)
  //   }
  // }, [response]);

  return (
    <View style={{ backgroundColor: "#FFFFF0", height: "100%" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FFFFF0" },
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, padding: 20, gap: 20 }}>
            <View
              style={{
                height: 600,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ height: 300 }}>
                <Image
                  source={poster1}
                  style={{ height: 300, width: 330, borderRadius: 9 }}
                  resizeMode="contain"
                />
              </View>
              <Text style={{ fontFamily: "DMBold", fontSize: 20, margin: 10 }}>
                Hey! Welcome
              </Text>
              <Text
                style={{
                  fontFamily: "DMMedium",
                  fontSize: 15,
                  width: 330,
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Here we Provide you all the songs one could ever listen to, with
                best quality
              </Text>
              <TouchableOpacity
                onPress={() => handleSpotifyLogin()}
                style={{
                  backgroundColor: "#F9541A",
                  borderRadius: 9,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 150,
                  height: 50,
                }}
              >
                <Text style={{ fontFamily: "DMBold" }}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default index;

import backgrounds from "./backgroundColors"
import fonts from "./fonts"
import defaultColors from './colors'
import printSizes from './print_sizes'
import profileRoutes from './profile_router'

export const Root = {
    baseurl: process.env.NODE_ENV === "production" ? "https://dev.waveable.co.uk/" : "http://localhost:2021/",
    key: "audio_wave_usr",
    sessionKey: "audio_wave_usr_session",
    spotifyAuth: "spotify_client_session",
    backgroundColors: backgrounds,
    defaultColors: defaultColors,
    printSizes: printSizes,
    profileRoutes: profileRoutes,
    fonts: fonts,
    fontSizes: [9, 10, 11, 12, 13, 14, 18, 20, 24, 36, 48, 64, 72, 144, 288]
}
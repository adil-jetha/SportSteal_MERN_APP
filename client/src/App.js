// Import the necessary components and libraries

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import SavedPage from "scenes/SavedPage";
import SponsoredPage from "scenes/SponsoredPage";

function App() {
  // Retrieve the mode from the Redux store.
  const mode = useSelector((state) => state.mode);
  // Construct a theme using the active mode.
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // Verify the user's authentication status
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Set up the application routes in */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sponsored" element={<SponsoredPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/saved/:userId"
              element={isAuth ? <SavedPage /> : <Navigate to="/" />}
            />
            <Route
              path="*"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;








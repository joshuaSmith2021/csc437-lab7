import React from "react";
import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery";
import { ImageDetails } from "./images/ImageDetails";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";
import { MainLayout } from "./MainLayout";
import { useImageFetching } from "./images/useImageFetching";
import { RegisterPage } from "./auth/RegisterPage";
import LoginPage from "./auth/LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const [username, setUsername] = useState("John Doe");
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);
  const { isLoading, fetchedImages } = useImageFetching("", authToken);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <ProtectedRoute authToken={authToken}>
                <Homepage userName={username} authToken={authToken} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/images"
            element={
              <ProtectedRoute authToken={authToken}>
                <ImageGallery
                  isLoading={isLoading}
                  fetchedImages={fetchedImages}
                  authToken={authToken}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/images/:imageId"
            element={
              <ProtectedRoute authToken={authToken}>
                <ImageDetails
                  isLoading={isLoading}
                  fetchedImages={fetchedImages}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/account"
            element={
              <ProtectedRoute authToken={authToken}>
                <AccountSettings
                  username={username}
                  setUsername={setUsername}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={<RegisterPage setAuthToken={setAuthToken} />}
          />

          <Route
            path="login"
            element={<LoginPage setAuthToken={setAuthToken} />}
          />

          <Route path="*" element={<>404</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

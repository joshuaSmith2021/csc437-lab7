import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";
import { MainLayout } from "./MainLayout.jsx";
import { useImageFetching } from "./images/useImageFetching.js";
import { RegisterPage } from "./auth/RegisterPage.js";
import LoginPage from "./auth/LoginPage.js";

function App() {
  const [username, setUsername] = useState("John Doe");
  const { isLoading, fetchedImages } = useImageFetching("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage userName={username} />} />
          <Route
            path="/images"
            element={
              <ImageGallery
                isLoading={isLoading}
                fetchedImages={fetchedImages}
              />
            }
          />
          <Route
            path="/images/:imageId"
            element={
              <ImageDetails
                isLoading={isLoading}
                fetchedImages={fetchedImages}
              />
            }
          />
          <Route
            path="/account"
            element={
              <AccountSettings username={username} setUsername={setUsername} />
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<>404</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

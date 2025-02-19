import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { useState } from "react";
import { MainLayout } from "./MainLayout.jsx";

function App() {
  const [username, setUsername] = useState("John Doe");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage userName={username} />} />
          <Route path="/images" element={<ImageGallery />} />
          <Route path="/images/:imageId" element={<ImageDetails />} />
          <Route
            path="/account"
            element={
              <AccountSettings username={username} setUsername={setUsername} />
            }
          />
          <Route path="*" element={<>404</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

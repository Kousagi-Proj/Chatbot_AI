import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import MainPage from "./MainPage";
import ChatBotHomeComponent from "../components/ChatBotHomeComponent";
import ChatBotSettingsComponent from "../components/ChatBotSettingsComponent";
import RouteNotFoundComponent from "../components/RouteNotFoundComponent";

const rootPath = "/";

function OutletRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path={rootPath} element={<MainPage />}>
            <Route index element={<ChatBotHomeComponent />} />
            <Route path="home" element={<ChatBotHomeComponent />} />
            <Route path="settings" element={<ChatBotSettingsComponent />} />
            <Route
              path="chatbot/:botId"
              element={<ChatBotSettingsComponent />}
            />
            <Route path="*" element={<RouteNotFoundComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default OutletRoutes;

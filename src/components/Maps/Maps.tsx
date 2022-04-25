import { Navigate, Route, Routes } from "react-router-dom";
import { auth } from "../../utils/supabaseUtils";
import MapView from "./Map";

type Props = {};

export default function Maps({}: Props) {
  return !auth.user() ? (
    <Navigate to="/login" />
  ) : (
    <div className="w-full flex flex-wrap justify-content-start">
      
      <Routes>
        <Route path="/:map_id" element={<MapView />} />
      </Routes>
    </div>
  );
}
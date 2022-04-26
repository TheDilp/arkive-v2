import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { useGetMaps } from "../../utils/customHooks";
import { auth } from "../../utils/supabaseUtils";
import LoadingScreen from "../Util/LoadingScreen";
import MapView from "./Map/Map";
import MapsTree from "./MapsTree";

type Props = {};

export default function Maps({}: Props) {
  const { project_id } = useParams();
  const maps = useGetMaps(project_id as string);
  if (!maps) return <LoadingScreen />;
  return !auth.user() ? (
    <Navigate to="/login" />
  ) : (
    <div className="w-full flex flex-wrap justify-content-start">
      <MapsTree />
      <Routes>
        <Route path="/:map_id" element={<MapView />} />
      </Routes>
    </div>
  );
}

import { Navigate, Outlet, useParams } from "react-router-dom";
import {
  useGetBoards,
  useGetDocuments,
  useGetProjectData,
} from "../../utils/customHooks";
import LoadingScreen from "../Util/LoadingScreen";
import Navbar from "../Nav/Navbar";
import { auth } from "../../utils/supabaseUtils";

export default function Project() {
  const { project_id } = useParams();
  const project = useGetProjectData(project_id as string);
  const { isLoading: isLoadingDocuments } = useGetDocuments(
    project_id as string
  );
  const { isLoading: isLoadingBoards } = useGetBoards(project_id as string);
  const user = auth.user();

  if (!user) return <Navigate to="/" />;

  if (isLoadingDocuments || isLoadingBoards) return <LoadingScreen />;

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

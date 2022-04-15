import { useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../../custom-types";
import { useGetProjectData } from "../../../utils/utils";
import DocumentsSettingsTable from "./DocumentsSettingsTable";
import ProjectSettings from "./ProjectSettings";

export default function ProjectSettingsIndex() {
  const [activeTab, setActiveTab] = useState(0);
  const { project_id } = useParams();
  const project = useGetProjectData(project_id as string);

  return (
    <div className="flex w-full h-screen">
      <div className="w-17rem surface-50 h-full">
        <ul className="list-none Lato px-1">
          <li
            className={`w-15rem text-gray-400 cursor-pointer py-2 pl-1 my-1 hover:text-white ${
              activeTab === 0 && "text-white bg-blue-700 "
            }`}
            onClick={() => setActiveTab(0)}
            style={{
              borderRadius: "0.35rem",
            }}
          >
            <i className="pi pi-fw pi-cog mr-2"></i>
            ProjectSettings
          </li>
          <li
            className={`w-15rem text-gray-400 cursor-pointer py-2 pl-1 my-1 hover:text-white ${
              activeTab === 1 && "text-white bg-blue-700 "
            }`}
            style={{
              borderRadius: "0.35rem",
            }}
            onClick={() => setActiveTab(1)}
          >
            <i className="pi pi-fw pi-palette mr-2"></i>
            Project Theme
          </li>
          <li
            className={`w-15rem text-gray-400 cursor-pointer py-2 pl-1 my-1 hover:text-white ${
              activeTab === 2 && "text-white bg-blue-700 "
            }`}
            style={{
              borderRadius: "0.35rem",
            }}
            onClick={() => setActiveTab(2)}
          >
            <i className="pi pi-fw pi-file mr-2"></i>
            Documents Settings
          </li>
        </ul>
      </div>
      {project && (
        <div className="w-11 h-full">
          {activeTab === 0 && <ProjectSettings project={project as Project} />}
          {activeTab === 2 && (
            <DocumentsSettingsTable project={project as Project} />
          )}
        </div>
      )}
    </div>
  );
}

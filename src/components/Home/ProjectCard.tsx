import { Link } from "react-router-dom";
import { Project } from "../../custom-types";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import defaultImage from "../../styles/DefaultProjectImage.jpg";
import { auth } from "../../utils/supabaseUtils";
export default function ProjectCard({ ...Project }: Project) {
  const user = auth.user();
  const header = (
    <Link to={`/project/${Project.id}/wiki`} className="no-underline">
      <img
        alt="Card"
        src={Project.cardImage || defaultImage}
        style={{ objectFit: "cover" }}
        className="w-full h-full cursor-pointer"
      />
    </Link>
  );
  const footer = (
    <div className="flex justify-content-between ">
      <Link to={`/project/${Project.id}/wiki`} className="no-underline">
        <Button
          label="Wiki"
          icon="pi pi-fw pi-file"
          iconPos="right"
          className="p-button-outlined p-button-primary Lato"
        />
      </Link>
      {(Project.user_id === user?.id ||
        Project.users?.some(
          (u) => u.user_id === user?.id && u.role === "Owner"
        )) && (
        <Link
          to={`/project/${Project.id}/settings/project-settings`}
          className="no-underline"
        >
          <Button
            label="Settings"
            icon="pi pi-fw pi-cog"
            iconPos="right"
            className="p-button-outlined p-button-secondary Lato"
          />
        </Link>
      )}
    </div>
  );
  return (
    <Card
      title={<div className="">{Project.title}</div>}
      className="text-center relative w-20rem mx-2 h-full overflow-hidden h-25rem Merriweather flex flex-column justify-content-between"
      header={header}
      footer={footer}
    ></Card>
  );
}

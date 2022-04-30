import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useParams } from "react-router-dom";
import { docItemDisplayDialog } from "../../../custom-types";
import { useUpdateDocument } from "../../../utils/customHooks";

type Props = {
  displayDialog: docItemDisplayDialog;
  setDisplayDialog: React.Dispatch<React.SetStateAction<docItemDisplayDialog>>;
};

export default function RenameDialog({
  displayDialog,
  setDisplayDialog,
}: Props) {
  const { project_id } = useParams();
  const documentTitleMutation = useUpdateDocument(project_id as string);
  return (
    <Dialog
      header={`Edit ${displayDialog.title}`}
      visible={displayDialog.show}
      className="w-3"
      onHide={() =>
        setDisplayDialog({
          id: "",
          title: "",
          show: false,
          folder: false,
          depth: 0,
          template: false,
        })
      }
      modal={false}
    >
      <div className="w-full">
        <div className="my-2">
          <InputText
            className="w-full"
            value={displayDialog.title}
            onChange={(e) =>
              setDisplayDialog((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                documentTitleMutation.mutate({
                  doc_id: displayDialog.id,
                  title: displayDialog.title,
                });
                setDisplayDialog({
                  id: "",
                  title: "",
                  show: false,
                  folder: false,
                  depth: 0,
                  template: false,
                });
              }
            }}
          />
        </div>
        <div className="flex w-full">
          <Button
            className="ml-auto p-button-raised p-button-text p-button-success"
            label="Save"
            icon="pi pi-fw pi-save"
            iconPos="right"
            onClick={() => {
              documentTitleMutation.mutate({
                doc_id: displayDialog.id,
                title: displayDialog.title,
              });
              setDisplayDialog({
                id: "",
                title: "",
                show: false,
                folder: false,
                depth: 0,
                template: false,
              });
            }}
          />
        </div>
      </div>
    </Dialog>
  );
}

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { docItemDisplayDialogProps } from "../../../custom-types";
import { useGetDocuments, useUpdateDocument } from "../../../utils/customHooks";

type Props = {
  displayDialog: docItemDisplayDialogProps;
  setDisplayDialog: React.Dispatch<
    React.SetStateAction<docItemDisplayDialogProps>
  >;
};

export default function DocumentUpdateDialog({
  displayDialog,
  setDisplayDialog,
}: Props) {
  const { project_id } = useParams();
  const updateDocumentMutation = useUpdateDocument(project_id as string);
  const { data } = useGetDocuments(project_id as string);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ title: string; parent: string }>({
    defaultValues: {
      title: displayDialog.title,
      parent: displayDialog.parent,
    },
  });
  const onSubmit: SubmitHandler<{
    title: string;
    parent: string;
  }> = (data) => {
    console.log(data);
    updateDocumentMutation.mutate({
      id: displayDialog.id,
      ...data,
    });
    setDisplayDialog({
      id: "",
      title: "",
      parent: "",
      folder: false,
      template: false,
      depth: 0,
      show: false,
    });
  };
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
          parent: "",
          template: false,
        })
      }
      modal={false}
    >
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-2">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputText
                className="w-full"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
        </div>
        <div className="my-2">
          <Controller
            name="parent"
            control={control}
            render={({ field }) => (
              <Dropdown
                className="w-full"
                placeholder="Document Folder"
                optionLabel="title"
                optionValue="id"
                value={field.value}
                filter
                onChange={(e) => field.onChange(e.value)}
                options={
                  data
                    ? [
                        { title: "Root", id: null },
                        ...data.filter(
                          (doc) => doc.folder && doc.id !== displayDialog.id
                        ),
                      ]
                    : []
                }
              />
            )}
          />
        </div>
        <div className="flex w-full">
          <Button
            className="ml-auto p-button-outlined p-button-success"
            label="Save"
            icon="pi pi-fw pi-save"
            iconPos="right"
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
}
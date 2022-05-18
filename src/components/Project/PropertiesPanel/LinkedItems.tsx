import { Icon } from "@iconify/react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetDocumentData,
  useGetImages,
  useGetMaps,
  useUpdateDocument,
} from "../../../utils/customHooks";

export default function LinkedItems() {
  const { project_id, doc_id } = useParams();
  const document = useGetDocumentData(project_id as string, doc_id as string);
  const maps = useGetMaps(project_id as string);
  const updateDocumentMutation = useUpdateDocument(project_id as string);
  const images = useGetImages(project_id as string);
  const [currentImage, setCurrentImage] = useState<string | undefined>(
    document?.image || ""
  );

  useEffect(() => {
    if (document) setCurrentImage(document?.image || "");
  }, [doc_id]);

  return (
    <Accordion activeIndex={0}>
      <AccordionTab
        header={
          <span className="flex align-items-center">
            <Icon icon="mdi:map" fontSize={22} /> Maps
          </span>
        }
        contentClassName="overflow-y-auto h-10rem bg-gray-900"
      >
        {maps.isLoading ? (
          <div className="w-full flex justify-content-center">
            <ProgressSpinner />
          </div>
        ) : (
          maps.data
            ?.filter((map) =>
              map.markers.some((marker) => marker.doc_id === doc_id)
            )
            .map((map) => (
              <Link
                key={map.id}
                to={`../../maps/${map.id}`}
                className="no-underline text-white flex flex-nowrap align-items-center hover:text-primary"
                style={{ fontWeight: 700 }}
              >
                <Icon icon="mdi:map-marker" />
                {map.title}
              </Link>
            ))
        )}
      </AccordionTab>
      <AccordionTab
        header={
          <span className="flex align-items-center">
            <Icon icon="mdi:draw" fontSize={22} /> Boards
          </span>
        }
        contentClassName="overflow-y-auto h-10rem"
      >
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
          sed quia non numquam eius modi.
        </p>
      </AccordionTab>
      <AccordionTab
        header={
          <div>
            <i className="pi pi-fw pi-image"></i> Document Image
          </div>
        }
      >
        {document?.image && (
          <div className="flex flex-nowrap justify-content-center mb-2">
            <img
              src={document.image}
              alt="Document"
              loading="lazy"
              className="w-10rem h-10rem"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}
        <div className="w-full flex flex-wrap justify-content-evenly">
          <span className="text-xs">
            Note: Custom image will overwrite image from storage
          </span>
          <div className="w-full my-3">
            <Dropdown
              className="w-full"
              options={images?.data || []}
              optionLabel="name"
              value={currentImage}
              onChange={(e) =>
                updateDocumentMutation.mutate({
                  doc_id: doc_id as string,
                image: `https://oqzsfqonlctjkurrmwkj.supabase.co/storage/v1/object/public/images/${project_id}/${e.value.name}`,
                })
              }
              itemTemplate={(item) => (
                <div className="w-full h-2rem flex align-items-center">
                  <img
                    className="h-full mr-2"
                    src={`https://oqzsfqonlctjkurrmwkj.supabase.co/storage/v1/object/public/images/${project_id}/${item.name}`}
                    alt={item.name}
                  />
                  <span>{item.name}</span>
                </div>
              )}
            />
          </div>
          <div className="w-full flex justify-content-evenly">
            <InputText
              className="w-10"
              value={currentImage}
              placeholder="Custom Image URL"
              onChange={(e) => setCurrentImage(e.target.value)}
            />
            <Button
              icon="pi pi-fw pi-save"
              className="p-button-outlined p-button-success"
              onClick={() =>
                updateDocumentMutation.mutate({
                  doc_id: doc_id as string,
                  image: currentImage,
                })
              }
            />
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  );
}

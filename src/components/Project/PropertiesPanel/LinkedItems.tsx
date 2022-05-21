import { Icon } from "@iconify/react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { ProgressSpinner } from "primereact/progressspinner";
import { Link, useParams } from "react-router-dom";
import { ImageProps } from "../../../custom-types";
import {
  useGetBoards,
  useGetDocumentData,
  useGetImages,
  useGetMaps,
  useUpdateDocument,
} from "../../../utils/customHooks";
import ImgDropdownItem from "../../Util/ImgDropdownItem";

export default function LinkedItems() {
  const { project_id, doc_id } = useParams();
  const document = useGetDocumentData(project_id as string, doc_id as string);
  const maps = useGetMaps(project_id as string);
  const boards = useGetBoards(project_id as string);
  const updateDocumentMutation = useUpdateDocument(project_id as string);
  const images = useGetImages(project_id as string);

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
        {boards.isLoading ? (
          <div className="w-full flex justify-content-center">
            <ProgressSpinner />
          </div>
        ) : (
          boards.data
            ?.filter((board) =>
              board.nodes.some((node) => node.document?.id === doc_id)
            )
            .map((board) => (
              <Link
                key={board.id}
                to={`../../boards/${board.id}`}
                className="no-underline text-white flex flex-nowrap align-items-center hover:text-primary"
                style={{ fontWeight: 700 }}
              >
                <Icon icon="mdi:draw" />
                {board.title}
              </Link>
            ))
        )}
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
            <Image
              src={`https://oqzsfqonlctjkurrmwkj.supabase.co/storage/v1/object/public/images/${document.image.link}`}
              alt="Document"
              className="w-10rem h-10rem"
              imageClassName="w-full h-full"
              preview
              // @ts-ignore
              // Wrong typing provided(string instead of object) so ignore the error
              imageStyle={{
                objectFit: "contain",
              }}
            />
          </div>
        )}
        <div className="w-full flex flex-wrap justify-content-evenly">
          <span className="text-xs">
            Note: Custom image will overwrite image from storage
          </span>
          <div className="w-full my-3 flex justify-content-center">
            <Dropdown
              className="w-10"
              filter
              filterBy="title"
              options={
                images?.data
                  ? [
                      {
                        title: "No Image",
                        link: "",
                      },
                      ...images.data,
                    ]
                  : []
              }
              optionLabel="title"
              value={document?.image || undefined}
              onChange={(e) =>
                updateDocumentMutation.mutate({
                  id: doc_id as string,
                  image: e.value,
                })
              }
              itemTemplate={(item: ImageProps) => (
                <ImgDropdownItem title={item.title} link={item.link} />
              )}
            />
          </div>
        </div>
      </AccordionTab>
    </Accordion>
  );
}

import { ImageProps } from "../custom-types";

export type MapProps = {
  id: string;
  title: string;
  map_image?: ImageProps;
  parent: { id: string; title: string } | null;
  project_id: string;
  markers: MapMarkerProps[];
  map_layers: MapLayerProps[];
  folder: boolean;
  expanded: boolean;
  public: boolean;
  sort: number;
};
export type MapMarkerProps = {
  id: string;
  icon: string;
  color: string;
  backgroundColor: string;
  lat: number;
  lng: number;
  text: string;
  map_id: string;
  public: boolean;
  doc_id?: string;
  map_link?: string;
};

export type MapLayerProps = {
  id: string;
  title: string;
  image?: ImageProps;
  map_id: string;
  public: boolean;
};

export type MapItemDisplayDialogProps = {
  id: string;
  title: string;
  map_image: ImageProps;
  map_layers: MapLayerProps[];
  parent: string;
  folder: boolean;
  depth: number;
  public: boolean;
  show: boolean;
};

export type CreateMapInputs = {
  title: string;
  map_image: ImageProps;
  parent: string;
  folder: boolean;
};
export type CreateMarkerInputs = {
  icon: string;
  text: string;
  color: string;
  doc_id: string;
  map_link: string;
  public: boolean;
};

export type CreateMapProps = {
  id: string;
  title: string;
  map_image: string | undefined;
  project_id: string;
  parent?: string | null;
  folder?: boolean;
  expanded: false;
};

export type MapUpdateProps = {
  id: string;
  title?: string;
  map_image?: ImageProps;
  parent?: string | null;
  expanded?: boolean;
  public?: boolean;
};

export type CreateMapMarkerProps = {
  id: string;
  map_id: string;
  lat: number;
  lng: number;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  text?: string;
  doc_id?: string;
  map_link?: string;
  public: boolean;
};

export type UpdateMapMarkerProps = {
  id: string;
  map_id: string;
  text?: string;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  lat?: number;
  lng?: number;
  doc_id?: string;
  map_link?: string;
  public: boolean;
};

export type UpdateMarkerInputs = {
  id: string;
  text: string;
  icon: string;
  color: string;
  backgroundColor: string;
  doc_id?: string | undefined;
  map_link?: string | undefined;
  show: boolean;
  public: boolean;
};

export type CreateMapLayerProps = {
  id: string;
  title: string;
  image?: ImageProps;
  map_id: string;
  public: boolean;
};

export type UpdateMapLayerProps = {
  id: string;
  map_id: string;
  title?: string;
  image?: ImageProps;
  public?: boolean;
};

// MISC

export type MarkerSidebarProps = {
  marker_title: string;
  map_id: string | undefined;
  doc_id: string | undefined;
  show: boolean;
};

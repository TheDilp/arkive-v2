import { EditorComponent, useRemirrorContext } from "@remirror/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RemirrorJSON } from "remirror";
import "remirror/styles/all.css";
import "../../../../styles/Editor.css";
import { CommandMenu } from "../../../Wiki/Editor/CommandMenu";
type Props = {
  content: RemirrorJSON | null;
};

export default function PublicEditorComponent({ content }: Props) {
  const { doc_id } = useParams();
  const { setContent } = useRemirrorContext();
  useEffect(() => {
    //   The custom mention react component does not load unless a minimal timeout is set
    setTimeout(() => {
      if (content) setContent(content ?? undefined);
    }, 1);
  }, [doc_id]);
  return content ? (
    <>
      <EditorComponent />
      <CommandMenu />
    </>
  ) : null;
}

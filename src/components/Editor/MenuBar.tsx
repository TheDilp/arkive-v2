import { useActive, useCommands } from "@remirror/react";
import { Menubar } from "primereact/menubar";
import { Icon } from "@iconify/react";
import "../../styles/MenuBar.css";
export default function MenuBar() {
  const {
    toggleBold,
    toggleItalic,
    toggleUnderline,
    toggleBulletList,
    toggleOrderedList,
    toggleHeading,
    toggleCallout,
    toggleStrike,
    updateCallout,
    insertHorizontalRule,
    updateLink,
    insertImage,
    focus,
  } = useCommands();
  const active = useActive();

  function calloutToggle(type: string) {
    if (active.callout()) {
      if (!active.callout({ type })) {
        updateCallout({ type });
      } else if (active.callout({ type })) {
        toggleCallout({ type });
      }
    } else {
      toggleCallout({ type });
    }
  }

  const items = [
    {
      label: "B",
    },
    {
      label: "I",
    },
    {
      label: "U",
    },
    {
      label: "Heading",
      items: [
        {
          label: "H1",
        },
        {
          label: "H2",
        },
        {
          label: "H3",
        },
        {
          label: "H4",
        },
        {
          label: "H5",
        },
        {
          label: "H6",
        },
      ],
    },
    {
      template: (item: any, options: any) => (
        <span className={`${options.className} text-center text-xl`}>
          <div className="flex justify-content-center m-0 customMenuBarIconContainer">
            <Icon
              className={`${options.iconClassName} m-0`}
              icon="bi:list-ul"
            />
          </div>
        </span>
      ),
    },

    {
      template: (item: any, options: any) => (
        <span className={`${options.className} text-center text-xl`}>
          <div className="flex justify-content-center m-0 customMenuBarIconContainer">
            <Icon
              className={`${options.iconClassName} m-0`}
              icon="bi:list-ol"
            />
          </div>
        </span>
      ),
    },
    {
      icon: "pi pi-fw pi-info-circle",
      items: [
        {
          label: "Info",
          icon: "pi pi-fw pi-info-circle",
          className: "calloutInfoButton",
        },
        {
          label: "Error",
          template: (item: any, options: any) => (
            <span className={`${options.className}`}>
              <span className="">
                <Icon
                  className={`${options.iconClassName}`}
                  icon="codicon:error"
                  color="#f00"
                />
              </span>
              <span className={`${options.labelClassName} `}>{item.label}</span>
            </span>
          ),
        },
        {
          label: "Warning",
          template: (item: any, options: any) => (
            <span className={`${options.className}`}>
              <span className="">
                <Icon
                  className={`${options.iconClassName}`}
                  icon="jam:triangle-danger-f"
                  color="#ff0"
                />
              </span>
              <span className={`${options.labelClassName} `}>{item.label}</span>
            </span>
          ),
        },
        {
          label: "Success",
          template: (item: any, options: any) => (
            <span className={`${options.className}`}>
              <span className="">
                <Icon
                  className={`${options.iconClassName}`}
                  icon="clarity:success-standard-line"
                  color="#0f0"
                />
              </span>
              <span className={`${options.labelClassName} `}>{item.label}</span>
            </span>
          ),
        },
      ],
    },
    {
      icon: "pi pi-fw pi-image",
    },
    {
      template: (item: any, options: any) => (
        <span className={`${options.className} text-center text-xl`}>
          <div className="flex justify-content-center m-0 customMenuBarIconContainer">
            <Icon
              className={`${options.iconClassName} m-0`}
              icon="radix-icons:divider-horizontal"
            />
          </div>
        </span>
      ),
    },
    { icon: "pi pi-fw pi-link" },
  ];

  return <Menubar model={items} className="p-0" />;
}

// <div className="menuBar ">
// <div className="menuBarGroup ">
//   <button
//     className={`menuBarButton  ${
//       active.bold() ? "menuBarButtonActive" : ""
//     }`}
//     onClick={() => {
//       toggleBold();
//       focus();
//     }}
//   >
//     <b>B</b>
//   </button>
//   <button
//     className={`menuBarButton ${
//       active.italic() ? "menuBarButtonActive" : ""
//     }`}
//     onClick={() => {
//       toggleItalic();
//       focus();
//     }}
//   >
//     <i>I</i>
//   </button>
//   <button
//     className={`menuBarButton ${
//       active.underline() ? "menuBarButtonActive" : ""
//     }`}
//     onClick={() => {
//       toggleUnderline();
//       focus();
//     }}
//   >
//     <u>U</u>
//   </button>
// </div>
// <div className="menuBarGroup">
//   {[1, 2, 3, 4, 5, 6].map((level) => (
//     <button
//       className={`menuBarButton ${
//         active.heading({ level }) ? "menuBarButtonActive" : ""
//       }`}
//       onClick={() => {
//         toggleHeading({ level });
//         focus();
//       }}
//     >
//       {`H${level}`}
//     </button>
//   ))}
// </div>
// <div className="menuBarGroup">
//   <button
//     className={`menuBarButton ${
//       active.bulletList() ? "menuBarButtonActive" : ""
//     }`}
//     onClick={() => {
//       toggleBulletList();
//       focus();
//     }}
//   >
//     <span>BL</span>
//   </button>
//   <button
//     className={`menuBarButton ${
//       active.orderedList() ? "menuBarButtonActive" : ""
//     }`}
//     onClick={() => {
//       toggleOrderedList();
//       focus();
//     }}
//   >
//     <span>OL</span>
//   </button>
// </div>

// <div className="menuBarGroup">
//   <span className="calloutContainer">
//     <span>CL</span>
//     <div className="calloutMenu">
//       <div
//         className="calloutOption calloutInfo"
//         onClick={() => {
//           calloutToggle("info");
//           focus();
//         }}
//       >
//         Info
//       </div>
//       <div
//         className="calloutOption calloutWarning"
//         onClick={() => {
//           calloutToggle("warning");
//           focus();
//         }}
//       >
//         Warning
//       </div>
//       <div
//         className="calloutOption calloutSuccess"
//         onClick={() => {
//           calloutToggle("success");
//           focus();
//         }}
//       >
//         Success
//       </div>
//       <div
//         className={`calloutOption calloutError ${active.callout({
//           type: "error",
//         })}`}
//         onClick={() => {
//           calloutToggle("error");
//           focus();
//         }}
//       >
//         Error
//       </div>
//     </div>
//   </span>

//   <button
//     className={`menuBarButton ${
//       active.image() ? "menuBarButtonActive" : ""
//     }`}
//     onClick={() => {
//       insertImage({ src: "https://picsum.photos/200/300" });
//       focus();
//     }}
//   >
//     IMG
//   </button>
//   <button
//     className={`menuBarButton ${
//       active.horizontalRule() ? "menuBarButtonActive" : ""
//     }`}
//     onClick={() => {
//       insertHorizontalRule();
//       focus();
//     }}
//   >
//     ---
//   </button>
//   <button
//     className={`menuBarButton ${
//       active.link() ? "menuBarButtonActive" : ""
//     }`}
//     onClick={() => {
//       updateLink({ href: "https://remirror.io" });
//       focus();
//     }}
//   >
//     LINK
//   </button>
// </div>
// </div>

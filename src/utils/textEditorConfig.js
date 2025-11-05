export const froalaConfig = {
  key: "GPL-OEM-LICENSE",
  attribution: false,
  placeholderText: "Write something amazing...",
  charCounterCount: false,
  heightMin: 350,

  toolbarButtons: {
    moreText: {
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
        "clearFormatting",
      ],
    },
    moreParagraph: {
      buttons: [
        "alignLeft",
        "alignCenter",
        "alignRight",
        "alignJustify",
        "formatOLSimple",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "lineHeight",
        "outdent",
        "indent",
        "quote",
      ],
    },
    moreRich: {
      buttons: [
        "insertLink",
        "insertImage",
        "insertTable",
        "emoticons",
        "fontAwesome",
        "specialCharacters",
        "insertHR",
      ],
    },
    moreMisc: {
      buttons: [
        "undo",
        "redo",
        "fullscreen",
        "print",
        "selectAll",
        "html",
        "help",
      ],
      align: "right",
    },
  },

  // Mobile toolbar
  toolbarButtonsMD: {
    moreText: {
      buttons: ["bold", "italic", "underline", "fontSize", "textColor"],
    },
    moreParagraph: {
      buttons: ["alignLeft", "alignCenter", "formatOL", "formatUL"],
    },
    moreRich: {
      buttons: ["insertLink", "insertImage"],
    },
  },

  fontFamily: {
    "Arial,Helvetica,sans-serif": "Arial",
    "Georgia,serif": "Georgia",
    "Impact,Charcoal,sans-serif": "Impact",
    "Tahoma,Geneva,sans-serif": "Tahoma",
    "'Times New Roman',Times,serif": "Times New Roman",
    "Verdana,Geneva,sans-serif": "Verdana",
    "'Courier New',Courier,monospace": "Courier New",
    "'Lucida Console',Monaco,monospace": "Lucida Console",
    "'Comic Sans MS',cursive": "Comic Sans MS",
    "'Roboto',sans-serif": "Roboto",
    "'Open Sans',sans-serif": "Open Sans",
  },

  fontFamilySelection: true,

  fontSize: [
    "8",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "24",
    "30",
    "36",
    "48",
    "60",
    "72",
    "96",
  ],
  fontSizeSelection: true,

  paragraphFormat: {
    N: "Normal",
    H1: "Heading 1",
    H2: "Heading 2",
    H3: "Heading 3",
    H4: "Heading 4",
    H5: "Heading 5",
    H6: "Heading 6",
    PRE: "Code",
  },

  // Line height
  lineHeights: {
    Default: "",
    Single: "1",
    1.15: "1.15",
    1.5: "1.5",
    Double: "2",
  },

  // Color palette
  colorsBackground: [
    "#FFFFFF",
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#C0C0C0",
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#800080",
    "#008080",
    "#000080",
    "#FFA500",
    "#FFC0CB",
    "#FFD700",
    "#E6E6FA",
  ],

  colorsText: [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#C0C0C0",
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#800080",
    "#008080",
    "#000080",
    "#FFA500",
    "#FFC0CB",
    "#FFD700",
    "#E6E6FA",
  ],

  imageUpload: true,
  imageUploadURL: null,
  imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
  imageDefaultWidth: 0,
  imageDefaultAlign: "center",
  imageDefaultDisplay: "block",
  imageMaxSize: 5 * 1024 * 1024,
  imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"],
  imageUploadRemoteUrls: false,
  events: {
    "image.beforeUpload": function (files) {
      const editor = this;
      if (files.length) {
        const reader = new FileReader();
        reader.onload = function (e) {
          editor.image.insert(e.target.result, null, null, editor.image.get());
        };
        reader.readAsDataURL(files[0]);
      }
      return false;
    },
  },

  linkAlwaysBlank: true,
  linkAutoPrefix: "https://",

  tableInsertButtons: ["tableBack", "|", "tableRows", "tableColumns"],
  tableColors: [
    "#FFFFFF",
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
  ],

  pastePlain: false,

  quickInsertEnabled: false,

  theme: "gray",
};

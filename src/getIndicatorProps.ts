const TAG_ATTRIBUTES = {
  fieldId: "data-contentful-field-id",
  entryId: "data-contentful-entry-id",
  locale: "data-contentful-locale",
} as const;

type getElementPropsArgs = {
  fieldId: string;
  entryId: string;
  locale?: string;
};

let livePreviewEnabled = false;

/**
 * @function enableLivePreview
 * @description Sets a global variable that indicates the application is in live preview, use at the root of the preview component
 */
export const enableLivePreview = () => {
  livePreviewEnabled = true;
};

/**
 * @function getIndicatorProps
 * @description Formats HTML attribute for live preview indicators when in preview mode
 */
export const getIndicatorProps = (args: getElementPropsArgs) => {
  if (!livePreviewEnabled) return {};
  return {
    [TAG_ATTRIBUTES.fieldId]: args.fieldId,
    [TAG_ATTRIBUTES.entryId]: args.entryId,
    [TAG_ATTRIBUTES.locale]: args.locale,
  };
};

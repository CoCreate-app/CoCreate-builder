import { dropMarker, boxMarker, boxMarkerTooltip } from './util/common'

export const tagNameTooltip = new boxMarkerTooltip((el) => {
  let name = el.getAttribute('data-CoC-name');
  return name ? name : el.tagName;
});
export const greenDropMarker = new dropMarker();
export const hoverBoxMarker = new boxMarker("CoC-hovered", 1);
export const selectBoxMarker = new boxMarker("CoC-selected", 2);

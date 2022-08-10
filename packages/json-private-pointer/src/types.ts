import {Segment} from "@crikey/json-pointer";

export type RelativePointer = string & { __json_private_pointer__relative__: true, __json_pointer__pure__: true };
export type AbsolutePointer = string & { __json_private_pointer__absolute__: true, __json_pointer__iref__: true };
export type Pointer = AbsolutePointer | RelativePointer;

export {Segment} from '@crikey/json-pointer';

export type EncodedSegment = Segment & { __json_private_pointer__encoded__: true };
export type DecodedSegment = [boolean, Segment];

export const root_pointer: AbsolutePointer = <AbsolutePointer>'';

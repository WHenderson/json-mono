export type RelativePurePointer = string & { __json_pointer__relative__: true, __json_pointer__pure__: true };
export type RelativeIRefPointer = string & { __json_pointer__relative__: true, __json_pointer__iref__: true };
export type RelativeOnlyPointer = string & { __json_pointer__relative__: true, __json_pointer__only__: true };
export type RelativePointer = RelativePurePointer | RelativeIRefPointer | RelativeOnlyPointer;
export type AbsolutePointer = string & { __json_pointer__absolute__: true };
export type RootPointer = AbsolutePointer & { __json_pointer__root__: true };
export type PurePointer = RelativePurePointer | RelativeOnlyPointer | AbsolutePointer;
export type Pointer = AbsolutePointer | RelativePointer;

export type Segment = string;

export type EncodedSegment = Segment & { __json_pointer__encoded__: true };

export const root_pointer: RootPointer = <RootPointer>'';

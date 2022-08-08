export type RelativePurePointer = string & { __relative__: true, __pure__: true };
export type RelativeIRefPointer = string & { __relative__: true, __iref__: true };
export type RelativeOnlyPointer = string & { __relative__: true, __only__: true };
export type RelativePointer = RelativePurePointer | RelativeIRefPointer | RelativeOnlyPointer;
export type AbsolutePointer = string & { __absolute__: true };
export type RootPointer = AbsolutePointer & { __root__: true };
export type PurePointer = RelativePurePointer | RelativeOnlyPointer | AbsolutePointer;
export type Pointer = AbsolutePointer | RelativePointer;

export type Segment = string;

export const root_pointer: RootPointer = <RootPointer>'';

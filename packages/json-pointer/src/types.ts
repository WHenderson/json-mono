export type Pointer = string;
export type Segment = string;

export type AbsolutePointer = Pointer & { __absolute__: true };
export type RelativePointer = Pointer & { __relative__: true };
export type RelativePurePointer = RelativePointer & { __pure__: true };
export type RelativeIRefPointer = RelativePointer & { __iref__: true };
export type RelativeOnlyPointer = RelativePointer & { __only__: true };

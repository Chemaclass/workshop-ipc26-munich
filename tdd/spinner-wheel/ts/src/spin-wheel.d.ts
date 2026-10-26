declare module 'spin-wheel' {
  export type WheelItem = {
    label?: string;
    backgroundColor?: string;
    labelColor?: string;
  };

  export type WheelProps = {
    items?: WheelItem[];
    radius?: number;
    itemLabelRadius?: number;
    itemLabelRadiusMax?: number;
    itemLabelRotation?: number;
    itemLabelAlign?: 'left' | 'center' | 'right';
    itemLabelColors?: string[];
    itemLabelBaselineOffset?: number;
    itemLabelFont?: string;
    itemLabelFontSizeMax?: number;
    itemBackgroundColors?: string[];
    lineWidth?: number;
    lineColor?: string;
    borderWidth?: number;
    borderColor?: string;
    isInteractive?: boolean;
    pointerAngle?: number;
    onRest?: (event: {
      type: string;
      currentIndex: number;
      rotation: number;
    }) => void;
  };

  export class Wheel {
    constructor(container: Element, props?: WheelProps | null);
    items: WheelItem[];
    spinToItem(
      itemIndex?: number,
      duration?: number,
      spinToCenter?: boolean,
      numberOfRevolutions?: number,
      direction?: number,
      easingFunction?: ((n: number) => number) | null,
    ): void;
  }
}

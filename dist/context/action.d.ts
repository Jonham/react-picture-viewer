interface SHOWN_LAYER {
    type: 'SHOWN_LAYER';
    visible: boolean;
}
interface SET_SCALE {
    type: 'SET_SCALE';
    scale: number;
}
export declare type IAction = SHOWN_LAYER | SET_SCALE;
export {};
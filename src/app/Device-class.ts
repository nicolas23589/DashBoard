import { Measurement } from "./Measurement-class";

export class Device {
    constructor(
        public id: number,
        public latitude: number,
        public longitude: number,
        public voltageMeasurements: Measurement[],
        public currentMeasurements: Measurement[],
        public icon: string
    ) {}

    get firstVoltageMeasurementValue(): number | undefined {
        return this.voltageMeasurements.length > 0 ? this.voltageMeasurements[0].value : undefined;
    }
  }
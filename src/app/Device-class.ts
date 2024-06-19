export class Device {
    constructor(
        public id: number,
        public name: string,
        public latitude: number,
        public longitude: number,
        public voltageMeasurements: any[],
        public currentMeasurements: any[],
        public icon: string
    ) {}

  }
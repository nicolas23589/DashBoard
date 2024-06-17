export class Device {
    constructor(
        public id: number,
        public nombre: string,
        public latitude: number,
        public longitude: number,
        public voltageMeasurements: any[],
        public currentMeasurements: any[],
        public icon: string
    ) {}

    get getCurrentVoltage(): any[] {
        return this.voltageMeasurements[0].series[0].value ;
    }

    get getCurrentCurrent(): any[] {
        return this.currentMeasurements[0].series[0].value ;
    }
  }
import { Service } from "./service";

export interface Rate {

    id: number;
    price: number;
    startDate: Date;
    endDate: Date;
    currency: string;
    service?: Service;
    serviceId: number;

}

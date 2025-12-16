import { Rate } from "./rate";
import { Provider } from "./provider";

export interface Service {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    providerId: number;
    provider?: Provider;
    rates?: Rate[];
}
import { BoatClass } from "app/model/boat-class";

export interface SystemData {
  id: number | string;
  boatclasses: BoatClass[];
}

export function createSystemData(params: Partial<SystemData>) {
  return {

  } as SystemData;
}

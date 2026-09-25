import { SPECIALIZED_ROLE_START } from "./constants";

export function isSpecializedRoleUpcoming(now = new Date()) {
  return now < new Date(`${SPECIALIZED_ROLE_START}T00:00:00.000Z`);
}

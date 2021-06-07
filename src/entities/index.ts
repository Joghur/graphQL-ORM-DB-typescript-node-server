/* eslint-disable import/no-cycle */
import { User } from './User';
import { Role } from './Role';

const entities = [User, Role];
export { User, Role, entities };

import { UserResolver } from './user';
import { RoleResolver } from './role';

export { UserResolver, RoleResolver };

export const resolvers = [UserResolver, RoleResolver];

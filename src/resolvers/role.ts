import {
	Resolver,
	Field,
	ObjectType,
	Query,
	Int,
	Arg,
	Ctx,
	Mutation,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Role } from '../entities';

@ObjectType()
class RoleFieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class RoleResponse {
	@Field(() => [RoleFieldError], { nullable: true })
	errors?: RoleFieldError[];

	@Field(() => Role, { nullable: true })
	role?: Role;
}

@ObjectType()
class Roles {
	@Field(() => [Role])
	roles: Role[];
}

@Resolver(Roles)
export class RoleResolver {
	@Query(() => Roles, { nullable: true })
	async allRoles(): Promise<Roles> {
		const roleRepository = getConnection().getRepository(Role);

		const roles = await roleRepository.find({
			relations: ['users'],
		});

		// console.log('roles', roles);

		return { roles };
	}

	@Query(() => RoleResponse, { nullable: true })
	async role(@Arg('id', () => Int) id: number): Promise<RoleResponse> {
		let role;
		let roleRepository;
		try {
			roleRepository = getConnection().getRepository(Role);
			role = await roleRepository.findOneOrFail(id, {
				relations: ['users'],
			});
		} catch (error) {
			return {
				errors: [
					{
						field: 'id',
						message: 'Could not find role',
					},
				],
			};
		}
		return {
			role,
		};
	}

	@Mutation(() => Boolean)
	async deleteRole(
		@Arg('id', () => Int) id: number,
		@Ctx() {},
	): Promise<boolean> {
		await Role.delete({ id });
		try {
			await Role.findOneOrFail({ id });
		} catch (error) {
			// role doesn't exists (or never did)
			return true;
		}
		// role still exists
		return false;
	}
}

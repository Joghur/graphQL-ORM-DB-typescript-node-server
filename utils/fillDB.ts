/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-unresolved */
import { EntityTarget, getConnection } from 'typeorm';
import { userType } from 'src/types';
import { User, Role, entities } from '../src/entities';
import { roles } from './data/roles';
import { createUserArray } from './createUserArray';

export const fillDB = async () => {
	// uncomment line below if database is to be cleaned before filling
	await cleanDB();

	// roles are finite and can be managed by an imported array
	await cleanDBTable(Role);
	await getConnection()
		.createQueryBuilder()
		.insert()
		.into(Role)
		.values(roles)
		.execute();

	// users are made on the fly
	const _users: userType[] = createUserArray(15); // making 15 fake users
	console.log('_user 0', _users[0]);
	await cleanDBTable(User);
	await getConnection()
		.createQueryBuilder()
		.insert()
		.into(User)
		.values(_users)
		.execute();

	// get User and Role DB repositories and mix roles into users. TypeORM will make the extra DB connection table
	const userRepo = getConnection().getRepository(User);
	const usersDB = await userRepo.find();
	const roleRepo = getConnection().getRepository(Role);
	const rolesDB = await roleRepo.find();
	const roleIds = rolesDB.map((role) => {
		return role.id;
	});

	for (let index = 0; index < usersDB.length; index++) {
		const user = await userRepo.findOneOrFail(usersDB[index].id);
		await getConnection()
			.createQueryBuilder()
			.relation(User, 'roles')
			.of(user)
			.add(roleIds[Math.floor(Math.random() * rolesDB.length)]); // add a random role to user
	}
	return;
};

export async function cleanDB() {
	try {
		for (const entity of entities) {
			await getConnection()
				.createQueryBuilder()
				.delete()
				.from(entity)
				.execute();
		}
	} catch (error) {
		throw new Error(`ERROR - cleanDB: Cleaning db: ${error}`);
	}
}

export async function cleanDBTable(table: EntityTarget<unknown>) {
	try {
		await getConnection()
			.createQueryBuilder()
			.delete()
			.from(table)
			.execute();
	} catch (error) {
		throw new Error(`ERROR - cleanDBTable: Cleaning db: ${error}`);
	}
}

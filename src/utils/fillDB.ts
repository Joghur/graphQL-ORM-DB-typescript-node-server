import { User, Role } from '../entities';
import { getConnection } from 'typeorm';
// import { fakeUsers } from './fakeData/fakeUsers';
// import { fakeRoles } from './fakeData/fakeRoles';
import { roles } from './data/roles';
import { users } from './data/users';
import faker from 'faker';

const entities = [User, Role];
faker.seed(123);

export const fillDB = async () => {
	// await cleanDB();
	await getConnection()
		.createQueryBuilder()
		.insert()
		.into(Role)
		.values(roles)
		.execute();

	await getConnection()
		.createQueryBuilder()
		.insert()
		.into(User)
		.values(users)
		.execute();
	// const role1 = new Role();
	// const role2 = new Role();
	// const role3 = new Role();

	// const user1 = new User();
	// const user2 = new User();
	// const user3 = new User();

	// const address1 = new Address();
	// const address2 = new Address();
	// const address3 = new Address();

	// role1.role = 'Formand';
	// role2.role = 'Næstformand';
	// role3.role = 'Menigt Medlem';

	// user1.name = faker.fake('{{name.firstName}} {{name.lastName}}');
	// user1.username = faker.name.findName();
	// user1.email = faker.internet.email();
	// user1.address = address1;
	// user1.roles = [role1];
	// user1.password = faker.random.uuid();

	// console.log('user1', user1);

	// await getConnection().manager.save(user1);
	// await getConnection().manager.save(user2);
	// await getConnection().manager.save(user3);

	// const photo2 = new Photo();
	// photo2.url = 'me-and-bears.jpg';
	// await connection.manager.save(photo2);

	// const user = new User();
	// user.name = 'John';
	// user.photos = [photo1, photo2];
	// await connection.manager.save(user);

	// const userRepo = getConnection().getRepository(User);
	// const _users = await userRepo.find();
	// console.log('_users', _users);
	// const addressRepo = getConnection().getRepository(Address);
	// const _addresses = await addressRepo.find();
	// console.log('_addresses', _addresses);
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
		throw new Error(`ERROR: Cleaning test db: ${error}`);
	}
}

// const fakeObjectArray = (fakes) => {
// 	return fakes.map((fake) => {
// 		return;
// 	});
// };

import _ from 'lodash';
import { userType } from '../src/types';
import faker from 'faker';
faker.seed(123);
faker.locale = 'de';

export const createUserArray = (userNumber: number = 100) => {
	let userArray: userType[] = [];

	// fill array with fake users
	for (let index = 0; index < userNumber; index++) {
		const user: userType = {
			active: _.sample([true, false])!,
			username: faker.internet.userName(),
			name: faker.name.findName(),
			email: faker.internet.email(),
			address:
				faker.address.streetAddress() + ', ' + faker.address.city(),
			phone: faker.phone.phoneNumber(),
			birthday: new Date(),
		};

		userArray.push(user);
	}
	return userArray;
};

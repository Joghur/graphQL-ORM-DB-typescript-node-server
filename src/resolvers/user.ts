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
import { User, Role } from '../entities';
import crypto from 'crypto';

@ObjectType()
class UserFieldError {
	@Field()
	field: string;
	@Field()
	message: string;
}

@ObjectType()
class UserResponse {
	@Field(() => [UserFieldError], { nullable: true })
	errors?: UserFieldError[];

	@Field(() => User, { nullable: true })
	user?: User;
}

@ObjectType()
class Users {
	@Field(() => [User])
	users: User[];
}

@Resolver(Users)
export class UserResolver {
	@Query(() => Users, { nullable: true })
	async allUsers(@Ctx() {  }: any): Promise<any> {
		// using onetime token server can read url and get userlist for making PDF file
		if (true) {
			const userRepository = getConnection().getRepository(User);
			const users = await userRepository.find({
				relations: ['roles'],
			});
			return { users };
		}
	}

	@Query(() => UserResponse, { nullable: true })
	async user(
		@Arg('id', () => Int) id: number,
		@Ctx() {  }: any,
	): Promise<UserResponse> {
		// if valid token is passed along
			let user;
			const userRepository = getConnection().getRepository(User);
			try {
				user = await userRepository.findOneOrFail(id, {
					relations: ['roles'],
				});
			} catch (error) {
				return {
					errors: [
						{
							field: 'id',
							message: 'Could not find user',
						},
					],
				};
			}
			return {
				user,
			};

	}

	@Mutation(() => Boolean)
	async deleteUser(
		@Arg('id', () => Int) id: number,
		@Ctx() {  }: any,
	): Promise<boolean> {
		// if valid token is passed along
			await User.delete({ id });
			try {
				await User.findOneOrFail({ id });
			} catch (error) {
				// user doesn't exists (or never did)
				return true;
			}
		// user still exists
		return false;
	}

	@Mutation(() => UserResponse)
	async createUser(
		@Arg('active') active: boolean,
		@Arg('name') name: string,
		@Arg('username') username: string,
		@Arg('birthday') birthday: string,
		@Arg('address') address: string,
		@Arg('email') email: string,
		@Arg('phone') phone: string,
		@Arg('mobile') mobile: string,
		@Arg('work') work: string,
		@Arg('workemail') workemail: string,
		@Arg('workphone') workphone: string,
		@Arg('size') size: string,
		@Arg('roles', () => [Int]) roles: [number],
		@Arg('password') password: string,
		@Ctx() {  }: any,
	): Promise<UserResponse> {
			// encrypting password
			const newSalt = crypto.randomBytes(64).toString('hex');
			const newPassword = crypto
				.pbkdf2Sync(password, newSalt, 10000, 64, 'sha512')
				.toString('base64');

			const user: any = {};

			// todo encrypt password
			// updating normal fields
			user.active = active;
			user.name = name;
			user.username = username;
			user.birthday = birthday;
			user.address = address;
			user.email = email;
			user.phone = phone;
			user.mobile = mobile;
			user.work = work;
			user.workemail = workemail;
			user.workphone = workphone;
			user.size = size;
			user.password = newPassword;

			// many-to-many relations
			let _roles: (Role | undefined)[] = [];
			roles.map(async (id: number) => {
				const role = await getConnection()
					.getRepository(Role)
					.findOne({ id });
				_roles.push(role);
				user.roles = _roles;
			});

			const madeUser = await getConnection()
				.getRepository(User)
				.save(user);

			return { user: madeUser };

	}

	@Mutation(() => UserResponse)
	async updateUser(
		@Arg('id', () => Int) id: number,
		@Arg('active') active: boolean,
		@Arg('name') name: string,
		@Arg('username') username: string,
		@Arg('birthday') birthday: string,
		@Arg('address') address: string,
		@Arg('email') email: string,
		@Arg('phone') phone: string,
		@Arg('mobile') mobile: string,
		@Arg('work') work: string,
		@Arg('workemail') workemail: string,
		@Arg('workphone') workphone: string,
		@Arg('size') size: string,
		@Arg('firebaseuid') firebaseuid: string,
		@Arg('firebaseemail') firebaseemail: string,
		@Arg('roles', () => [Int]) roles: [number],
		@Ctx() {  }: any,
	): Promise<UserResponse> {
			const user: any = await getConnection()
				.getRepository(User)
				.findOne(
					{ id },
					{
						relations: ['roles'],
					},
				);

			// updating normal fields
			user.active = active;
			user.name = name;
			user.username = username;
			user.birthday = birthday;
			user.address = address;
			user.email = email;
			user.phone = phone;
			user.mobile = mobile;
			user.work = work;
			user.workemail = workemail;
			user.workphone = workphone;
			user.size = size;
			user.firebaseuid = firebaseuid;
			user.firebaseemail = firebaseemail;

			// updating many-to-many relations
			let _roles: (Role | undefined)[] = [];
			roles.map(async (id: number) => {
				const role = await getConnection()
					.getRepository(Role)
					.findOne({ id });
				_roles.push(role);
				user.roles = _roles;
			});

			await getConnection().getRepository(User).save(user);

			const updated: any = await getConnection()
				.getRepository(User)
				.findOne(
					{ id },
					{
						relations: ['roles'],
					},
				);
			return { user: updated };
	}

	// @Mutation(() => Post)
	// @UseMiddleware(isAuth)
	// async createPost(
	//   @Arg("input") input: PostInput,
	//   @Ctx() { req }: MyContext
	// ): Promise<Post> {
	//   return Post.create({
	// 	...input,
	// 	creatorId: req.session.userId,
	//   }).save();
	// }

	// @Mutation(() => Post, { nullable: true })
	// @UseMiddleware(isAuth)
	// async updatePost(
	//   @Arg("id", () => Int) id: number,
	//   @Arg("title") title: string,
	//   @Arg("text") text: string,
	//   @Ctx() { req }: MyContext
	// ): Promise<Post | null> {
	//   const result = await getConnection()
	// 	.createQueryBuilder()
	// 	.update(Post)
	// 	.set({ title, text })
	// 	.where('id = :id and "creatorId" = :creatorId', {
	// 	  id,
	// 	  creatorId: req.session.userId,
	// 	})
	// 	.returning("*")
	// 	.execute();

	//   return result.raw[0];
	// }
}

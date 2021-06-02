import { ObjectType, Field } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	JoinTable,
	ManyToMany,
	BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Role } from '../entities';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	active!: boolean;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column({ unique: true })
	username!: string;

	@Field(() => String, { nullable: true })
	@CreateDateColumn()
	birthday: Date;

	@Field()
	@Column()
	address!: string;

	@Field(() => String, { nullable: true })
	@Column()
	email!: string;

	@Field(() => String, { nullable: true })
	@Column()
	phone: string;

	@Field(() => String, { nullable: true })
	@Column()
	mobile: string;

	@Field(() => String, { nullable: true })
	@Column()
	work: string;

	@Field(() => String, { nullable: true })
	@Column()
	workemail: string;

	@Field(() => String, { nullable: true })
	@Column()
	workphone: string;

	@Field(() => String, { nullable: true })
	@Column()
	size: string;

	@Field(() => String, { nullable: true })
	@Column({
		type: 'text',
		nullable: true,
	})
	firebaseemail: string;

	@Field(() => String, { nullable: true })
	@Column({
		type: 'text',
		nullable: true,
	})
	firebaseuid: string;

	@Field(() => [Role], { nullable: true })
	@ManyToMany(() => Role, (role) => role.users)
	@JoinTable()
	roles: Role[];

	@Column({ type: 'varchar', length: 100, nullable: false })
	password!: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@BeforeInsert()
	async setPassword(password: string) {
		const salt = await bcrypt.genSalt();
		this.password = await bcrypt.hash(password || this.password, salt);
	}
}

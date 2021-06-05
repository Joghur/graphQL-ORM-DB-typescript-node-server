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
} from 'typeorm';
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

	@Field(() => [Role], { nullable: true })
	@ManyToMany(() => Role, (role) => role.users)
	@JoinTable()
	roles: Role[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}

import { ObjectType, Field } from 'type-graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	BaseEntity,
	ManyToMany,
} from 'typeorm';
import { User } from '../entities';

@ObjectType()
@Entity()
export class Role extends BaseEntity {
	@Field()
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String, { nullable: true })
	@Column()
	role!: string;

	@Field(() => [User], { nullable: true })
	@ManyToMany(() => User, (user) => user.roles)
	users: User[];

	@Field(() => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt: Date;
}

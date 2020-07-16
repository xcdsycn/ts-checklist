import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    BaseEntity
} from "typeorm";

@Entity()
export class WorkItem extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        length: 100,
    })
    text!: string;

    @Column({ default: false })
    isChecked!: boolean;

    @CreateDateColumn({ type: "text" })
    createAt!: Date;
    @UpdateDateColumn({ type: "text" })
    updateAt!: Date;
}
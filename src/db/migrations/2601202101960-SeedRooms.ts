import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import {Room} from "../../modules/rooms/room.entity";
import {RoomsSeed} from "../seeds/rooms.seed";
import {RoomRepository} from "../../modules/rooms/room.repository";


export class SeedRooms2601202101960 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Room).createQueryBuilder()
      .insert()
      .into(Room)
      .values(RoomsSeed)
      .orIgnore()
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await getRepository(RoomRepository).delete(RoomsSeed);
  }

}

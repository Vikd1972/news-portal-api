/* eslint-disable no-await-in-loop */
import requireDirectory from 'require-directory';

import connectToDb from '../utils/connectToDb';
import { logger } from '../../utils';

requireDirectory.defaults.extensions = ['ts'];

type SeedFile = { default: () => Promise<void> }

const seedsDir = process.argv[2] || 'required';
const folderContent = requireDirectory<unknown, SeedFile>(
  module,
  `${__dirname}/${seedsDir}`,
) as { [key: string]: SeedFile };

const seeds = Object.entries(folderContent);

const SEEDS_META_TABLE_NAME = 'seeds';

const runSeeds = async () => {
  try {
    const connection = await connectToDb();

    const [existingTable] = await connection.query(/* sql */`
      SELECT table_name
      FROM information_schema.tables
      WHERE
        table_schema='public'
        AND table_name='${SEEDS_META_TABLE_NAME}'
    `);

    if (!existingTable) {
      await connection.query(/* sql */`
        CREATE TABLE "public"."${SEEDS_META_TABLE_NAME}" (
          "name" Character Varying NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "unique_seeds_name" UNIQUE( "name" )
        )
      `);
      logger.infoForce('Seed meta table created');
    }

    logger.infoForce('Seeds START');

    for (let i = 0; i < seeds.length; i++) {
      const [fileName, { default: seed }] = seeds[i];

      const seedName = `${fileName} (${seedsDir})`;

      const [usedSeed] = await connection.query(/* sql */`
        SELECT name
        FROM ${SEEDS_META_TABLE_NAME}
        WHERE name='${seedName}'
      `);

      if (usedSeed) {
        continue;
      }

      logger.gap(1);

      logger.infoForce(`--- ${seed.name} START ---`);
      await seed();

      await connection.query(/* sql */`
        INSERT INTO ${SEEDS_META_TABLE_NAME}("name")
        VALUES ('${seedName}')
      `);
      logger.infoForce(`--- ${seed.name} END ---`);
    }

    logger.gap(1);
    logger.infoForce('Seeds END');
    process.exit(0);
  } catch (err) {
    logger.error(err);
    logger.error('Seeds failed with error:', err.message);
    process.exit(1);
  }
};

runSeeds();

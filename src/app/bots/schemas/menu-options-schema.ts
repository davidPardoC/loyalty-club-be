import { Abilities } from 'src/app/abilities/enums/abilities.enum';
import { z } from 'zod';

export const menuOptionsSchema = z
  .object({
    text: z.string(),
    next_step: z.number(),
  })
  .array();

export const abilitySchema = z.object({
  ability: z.nativeEnum(Abilities),
});

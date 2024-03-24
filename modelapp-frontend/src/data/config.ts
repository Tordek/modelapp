import { plainToClass } from "class-transformer";
import { IsString, validateSync } from "class-validator";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

/**
 * Holds configurations for the project.
 *
 * It uses class-validator annotations to find missing configurations.
 */
class Config {
  @IsString()
  public readonly apiHost!: string;
}

// Only export the type/interface. It is only instantiated here.
export type { Config };

let configInstance: Config | null = null;
/**
 * Server-side function to get and validate env configs.
 *
 * Since Next.js doesn't have a place to put initialization code that runs
 * when starting the app, we need to use a Singleton.
 */
export const getConfig = () => {
  // None of these values are set during build, so it makes
  // no sense to run this function at buildtime.
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    throw new Error("It makes no sense to call this at this phase.");
  }

  if (configInstance === null) {
    const rawConfig = {
      apiHost: process.env.API_HOST,
    };

    configInstance = plainToClass(Config, rawConfig);
    const errors = validateSync(configInstance);

    if (errors) {
      throw new Error(errors.toString());
    }
  }

  return configInstance;
};

import { registerAs } from "@nestjs/config";
import { ConfigKey } from "../enum";
import { Validation as VALIDATION } from "../interface";

const Validation = registerAs(
    ConfigKey.VALIDATION, () : VALIDATION => ({
      white_list_email: ['gmail.com', 'yahoo.com'],
    }),
);

export default Validation
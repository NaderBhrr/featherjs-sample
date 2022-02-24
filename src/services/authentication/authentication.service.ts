// A messages service that allows to create new
import { Application, Id, NullableId, Params, Service } from "@feathersjs/feathers"
import { Db } from "mongodb";
import { authenticate } from "./repository.db";
import * as Utils from "../../utils";

interface ISigninRequest {
    email: string;
    password: string;
}
// and return all existing messages
export class AuthenticationService {

    // Database intance
    db: Db;

    constructor(db: Db) {
        this.db = db
    }

    async create(api_request: ISigninRequest) {

        const signin_result: any = await authenticate(this.db)(api_request);

        const isIdentityAuthenticated = signin_result.email && (await Utils.StringUtil.assertHashedPassword(api_request.password, signin_result.password));

        if (!isIdentityAuthenticated) {
            return {
                status: 401,
                data: {
                    message: "Unauthorized access"
                }
            }
        }

        const jwtClaims = { identity_id: signin_result._id, email_address: signin_result.email_address };

        const token = Utils.JWTUtil.createToken(jwtClaims);

        return {
            status: 200,
            data: {
                token
            }
        }
    }

}
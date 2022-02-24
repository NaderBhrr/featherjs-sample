// A messages service that allows to create new
import { Application, Id, NullableId, Params, Service } from "@feathersjs/feathers"
import { Db, ObjectId } from "mongodb";
import { AccountsModels } from "../../interfaces";
import * as Utils from "../../utils";
import { edit, signup } from "./repository.db";


// and return all existing messages
export class AccountsService {

    // Database instance
    db: Db;

    constructor(db: Db) {
        this.db = db
    }

    async create(api_request: AccountsModels.ISignupRequest) {

        const newIdentityModel = {
            email: api_request.email,
            password: await Utils.StringUtil.generate_hash(api_request.password)
        }

        const signup_result = signup(this.db)(newIdentityModel);

        return signup_result
    }

    async update(id: NullableId, api_request: AccountsModels.IUpdateIdentityRequest, params: any) {

        const informationByToken = Utils.JWTUtil.assertIncomingToken(params.headers.authorization.substring(7))

        const updateIdentityModel = {
            ...api_request,
            password: await Utils.StringUtil.generate_hash(api_request.password as string)
        }

        const update_result = await edit(this.db)({ _id: new ObjectId(informationByToken?.identity_id) }, updateIdentityModel);

        console.log("res", update_result);
        return {
            status: 200,
            data: true
        }
    }

}
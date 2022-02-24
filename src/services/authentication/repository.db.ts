import { Db, ObjectId } from "mongodb";

export const authenticate =
    (db: Db) => async (data: any) => {
        try {

            const result = await db
                .collection('accounts')
                .findOne({ email: data.email });

            return result
        } catch (error) {
            return error;
        }
    };
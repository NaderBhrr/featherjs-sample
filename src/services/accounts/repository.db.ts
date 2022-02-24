import { Db, ObjectId } from "mongodb";

export const signup =
    (db: Db) => async (data: any) => {
        try {
            const newEntity = data;

            // Create a sparse unique index
            await db
                .collection("accounts")
                .createIndex({ "email": 1 }, { sparse: true, unique: true });

            const result = await db
                .collection('accounts')
                .insertOne({ ...newEntity, createdAt: new Date().toISOString() });

            return result.acknowledged && result.insertedId instanceof ObjectId
        } catch (error) {
            return error;
        }
    };


export const edit = (db: Db) => async (queryCondition: any, data: any) => {

    try {
        const result = await db.collection("accounts").updateOne(
            queryCondition, { $set: data }, { upsert: false }
        )

        console.log("up res >>", result);
    } catch (error) {
        return error
    }
}
import jwt from "jsonwebtoken";


const jwtKey = "my_secret_key";
const jwtExpirySeconds = 300;

interface IDecodedToken {
    identity_id: string
}

export function createToken(payload: { [key: string]: unknown }) {

    const token = jwt.sign(payload, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds
    })

    return token
}

export function assertIncomingToken(payload: string) {

    try {
        const decodedToken = jwt.verify(payload, jwtKey) as IDecodedToken

        return decodedToken
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new Error("Malformed token identified")
        }
    }
}
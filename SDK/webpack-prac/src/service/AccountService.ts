
import {
    AccountVO
} from "../domain/AccountVO"

export class AccountService {

    public createAccount () : void {
        console.log("createAcount called...");
        const user1 : AccountVO = new AccountVO("this is private key", "this is public key", "this is address");
    }

}
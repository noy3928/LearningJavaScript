interface AccountI {

}

export class AccountVO implements AccountI {
    private _privateKey : string;
    private _publicKey : string;
    private _address : string;

    constructor(privateKey : string , publicKey : string, address : string){
        this._privateKey = privateKey;
        this._publicKey = publicKey;
        this._address = address;
    }

    public getPrivateKey() : string {
        return this._privateKey;
    }

    public getPublicKey() : string {
        return this._publicKey;
    }

    public getAddress() : string {
        return this._publicKey;
    }

}
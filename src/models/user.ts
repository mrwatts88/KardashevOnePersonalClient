export class User{

    public displayName
    public email
    public emailVerified
    public photoURL
    public isAnonymous
    public uid
    public fcmToken
  
    constructor(userData){
        this.displayName = userData.displayName
        this.email = userData.email
        this.emailVerified = userData.emailVerified
        this.photoURL = userData.photoURL
        this.isAnonymous = userData.isAnonymous
        this.uid = userData.uid
        this.fcmToken = userData.fcmToken     
    }
  }
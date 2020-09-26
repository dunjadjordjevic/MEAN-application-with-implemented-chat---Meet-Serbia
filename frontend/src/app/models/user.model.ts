export class User {
    //buyer or seller individual-> name; seller legal entity-> name of company
    name : String; 

    //buyer or seller individual-> name; seller legal entity-> ''
    surname : String; 

    email : String;
    occupation : String;
    contactTelephone : String;
    username : String;
    password : String;

    //buyer or seller individual-> gender; seller legal entity-> ''
    gender : String;
    typeOfUser: String;
}
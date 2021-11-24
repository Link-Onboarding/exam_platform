export default function labelSwitch(keys) {
    for ( const key of keys ) {
        switch(keys) {
            case "username":
                return  "Nume de utilizator";
            break;
            case "first_name":
                return  "Prenume";
            break;
            case "last_name":
                return  "Nume";
            break;
            case "frozen":
                return  "Inghetat";
            break;
            case "permission":
                return  "Tip";
            break;
            case "id":
                return  "Identificator";
            break;
            case "pid":
                return  "Parinte";
            break;
            case "name":
                return  "Denumire";
            break;
            case "shortname":
                return  "Prescurtare";
            break;
            default:
                return "undefined";
            break;
        }
    }
}
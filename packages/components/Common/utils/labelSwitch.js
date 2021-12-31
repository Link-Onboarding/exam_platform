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
            case "class_id":
                return  "ID Materie";
            break;
            case "slots":
                return  "Nr. Intrebari";
            break;
            case "start_date":
                return  "Data de inceput";
            break;
            case "finish_date":
                return  "Data de sfarsit";
            break;
            case "result":
                return  "Rezultat";
            break;
            default:
                return "undefined";
            break;
        }
    }
}
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPages from "../components/ProtectedPage";

export default function UploadRoom(){
    useHostOnlyPage();
    return (
        <ProtectedPages>
                <h1>Upload room</h1>
        </ProtectedPages>
    );
}
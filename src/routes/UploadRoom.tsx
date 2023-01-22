import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPages from "../components/ProtectedPage";

export default function UploadRoom(){
    return (
    <ProtectedPages>
        <HostOnlyPage>
            <h1>Upload room</h1>
        </HostOnlyPage>
    </ProtectedPages>
    );
}
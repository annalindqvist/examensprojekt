// IMPORT COMPONENTS
import AuthSettingsComponent from '../components/Settings/AuthSettingsComponent';
import DeleteAccountComponent from '../components/Settings/DeleteAccountComponent';
import SignOutComponent from '../components/Settings/SignOutComponent';
import BackBtnComponent from '../components/GoBackBtnComponent/BackBtnComponent';
import Navbar from '../components/Navbar/Navbar';


const Settings = () => {
    return (
        <>
        <Navbar/>
        <div className="pink-background overflow-scroll centered-content-column">

            <div className="flex-row">
                <BackBtnComponent />
                <h1 className="settings-h1">Settings</h1>
            </div>


            <AuthSettingsComponent />
            <DeleteAccountComponent />
            <SignOutComponent />
        </div>
        </>
    );
}

export default Settings;